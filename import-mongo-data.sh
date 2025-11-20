#!/bin/bash

# Exit on error, treat unset variables as error
set -euo pipefail

# Configuration
REMOTE_URI="${REMOTE_MONGODB_URI:-${MONGODB_URI:-}}"
LOCAL_URI="mongodb://localhost:27017"
DATABASE_NAME="go-with-me"
BACKUP_DIR="./mongo-backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CONTAINER_NAME="gwm-mongo"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
error_exit() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Load .env.local if it exists
if [ -f ".env.local" ]; then
    info "Loading environment variables from .env.local..."
    set -a
    source .env.local
    set +a
fi

printenv

echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}       MongoDB Data Migration Script${NC}"
echo -e "${YELLOW}════════════════════════════════════════════════════════${NC}"
echo ""

# Check if mongodump is installed
if ! command -v mongodump &> /dev/null; then
    error_exit "mongodump is not installed. Please install MongoDB Database Tools:
    macOS: brew install mongodb-database-tools
    Or download from: https://www.mongodb.com/try/download/database-tools"
fi

# Step 1: Check remote URI
if [ -z "$REMOTE_URI" ]; then
    error_exit "REMOTE_MONGODB_URI or MONGODB_URI not set.
    Please set it in .env.local or export it:
    export REMOTE_MONGODB_URI='mongodb://mongo:27017/go-with-me?authSource=admin'"
fi

# Step 2: Ensure local MongoDB container is running
info "Checking local MongoDB container..."
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    warning "Local MongoDB container not running. Starting it..."
    docker compose up -d mongo
    
    # Wait for MongoDB to be ready (better than fixed sleep)
    info "Waiting for MongoDB to be ready..."
    for i in {1..30}; do
        if docker exec "$CONTAINER_NAME" mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
            success "MongoDB is ready!"
            break
        fi
        if [ $i -eq 30 ]; then
            error_exit "MongoDB failed to start within 30 seconds"
        fi
        sleep 1
    done
else
    success "Local MongoDB container is running"
fi

# Verify local MongoDB is accessible
if ! docker exec "$CONTAINER_NAME" mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    error_exit "Cannot connect to local MongoDB. Please check the container."
fi

# Step 3: Export from Digital Ocean MongoDB
info "Exporting data from Digital Ocean MongoDB..."
mkdir -p "$BACKUP_DIR"

# Test connection before full dump
info "Testing connection to remote MongoDB..."
if ! mongodump --uri="$REMOTE_URI" --db="$DATABASE_NAME" --collection=system.indexes --dryRun &> /dev/null; then
    warning "Connection test failed, but continuing with full dump..."
fi

# Perform the dump
if ! mongodump --uri="$REMOTE_URI" --out="$BACKUP_DIR/$TIMESTAMP"; then
    error_exit "Failed to export from Digital Ocean MongoDB. Check your connection string and network access."
fi

success "Export completed!"

# Step 4: Find the database directory (handle multiple databases or specific database)
DB_DIR=""
if [ -d "$BACKUP_DIR/$TIMESTAMP/$DATABASE_NAME" ]; then
    # If dump contains the exact database name we want
    DB_DIR="$BACKUP_DIR/$TIMESTAMP/$DATABASE_NAME"
    DB_DIR_NAME="$DATABASE_NAME"
elif [ $(find "$BACKUP_DIR/$TIMESTAMP" -mindepth 1 -maxdepth 1 -type d | wc -l) -eq 1 ]; then
    # If there's only one database in the dump
    DB_DIR=$(find "$BACKUP_DIR/$TIMESTAMP" -mindepth 1 -maxdepth 1 -type d | head -1)
    DB_DIR_NAME=$(basename "$DB_DIR")
    warning "Found database '$DB_DIR_NAME' in dump. Using it instead of '$DATABASE_NAME'."
elif [ $(find "$BACKUP_DIR/$TIMESTAMP" -mindepth 1 -maxdepth 1 -type d | wc -l) -gt 1 ]; then
    error_exit "Multiple databases found in dump. Please specify which database to import, or use --db flag in mongodump."
else
    error_exit "No database directories found in dump. Export may have failed."
fi

info "Database to import: $DB_DIR_NAME"

# Step 5: Import into local MongoDB
info "Importing data into local MongoDB (database: $DATABASE_NAME)..."

# Create dump directory in container
docker exec "$CONTAINER_NAME" mkdir -p /data/dump

# Copy backup into container
info "Copying backup into container..."
docker cp "$DB_DIR" "$CONTAINER_NAME:/data/dump/$DB_DIR_NAME"

# Restore inside container
info "Restoring data (this may take a while)..."
EXCLUDE_SYSTEM="--excludeCollection=system.roles --excludeCollection=system.users --excludeCollection=system.version"

if ! docker exec "$CONTAINER_NAME" mongorestore \
    --db="$DATABASE_NAME" \
    --drop \
    $EXCLUDE_SYSTEM \
    /data/dump/$DB_DIR_NAME; then
    error_exit "Failed to import into local MongoDB"
fi

# Verify import
info "Verifying import..."
COLLECTIONS=$(docker exec "$CONTAINER_NAME" mongosh "$DATABASE_NAME" --quiet --eval "db.getCollectionNames().join(',')" 2>/dev/null || echo "")
if [ -z "$COLLECTIONS" ]; then
    warning "Could not verify collections, but import appeared successful."
else
    success "Collections imported: $COLLECTIONS"
    
    # Count documents in each collection
    info "Document counts:"
    for col in $(echo "$COLLECTIONS" | tr ',' ' '); do
        COUNT=$(docker exec "$CONTAINER_NAME" mongosh "$DATABASE_NAME" --quiet --eval "db.$col.countDocuments()" 2>/dev/null || echo "0")
        echo "  - $col: $COUNT documents"
    done
fi

# Step 6: Cleanup
info "Cleaning up..."
docker exec "$CONTAINER_NAME" rm -rf /data/dump/$DB_DIR_NAME

# Optionally clean old backups (older than 7 days)
if command -v find &> /dev/null; then
    find "$BACKUP_DIR" -maxdepth 1 -type d -name "20*" -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
    info "Cleaned up backups older than 7 days"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
success "Migration completed successfully!"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
info "Data is available in local MongoDB:"
echo "  URI: mongodb://mongo:27017/$DATABASE_NAME"
echo "  Container: $CONTAINER_NAME"
echo ""
info "Backup saved to: $BACKUP_DIR/$TIMESTAMP"
echo ""

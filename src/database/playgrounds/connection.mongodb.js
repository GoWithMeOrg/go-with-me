/* global use, db */
// MongoDB Connection Test Playground
// This playground helps test your MongoDB connection

// Test connection by listing all databases
db.adminCommand("listDatabases");

// Show current database
db.getName();

// Show current user (if authenticated)
db.runCommand({ connectionStatus: 1 });

// Test basic operations
// db.runCommand({ping: 1});

// List all collections in current database
// db.getCollectionNames();

// Show database stats
// db.stats();

// Show collection stats for roles
// db.getCollection("roles").stats();

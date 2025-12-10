#!/bin/bash
# Setup script for Let's Encrypt SSL certificates
# Run this on the Droplet to obtain initial SSL certificates

set -e

DOMAIN="${1:-MY_DOMAIN.COM}"
EMAIL="${2:-your-email@example.com}"

if [ "$DOMAIN" = "MY_DOMAIN.COM" ]; then
  echo "Usage: $0 <domain> [email]"
  echo "Example: $0 tribeplans.ru admin@tribeplans.ru"
  exit 1
fi

echo "Setting up SSL certificates for $DOMAIN"
echo "Email: $EMAIL"

# Create necessary directories
mkdir -p certs
mkdir -p /var/www/certbot

# Stop nginx temporarily if running
docker-compose -f ../../docker-compose.prod.yml stop reverse-proxy 2>/dev/null || true

# Obtain certificate using standalone mode
docker run -it --rm \
  -v "$(pwd)/certs:/etc/letsencrypt" \
  -v "/var/www/certbot:/var/www/certbot" \
  -p 80:80 \
  certbot/certbot certonly \
  --standalone \
  --preferred-challenges http \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --email "$EMAIL" \
  --agree-tos \
  --non-interactive

# Copy certificates to the expected location
if [ -f "certs/live/$DOMAIN/fullchain.pem" ]; then
  cp "certs/live/$DOMAIN/fullchain.pem" "certs/fullchain.pem"
  cp "certs/live/$DOMAIN/privkey.pem" "certs/privkey.pem"
  echo "Certificates copied successfully!"
  echo "You can now start the services with: docker-compose -f ../../docker-compose.prod.yml up -d"
else
  echo "Error: Certificates not found. Please check the output above."
  exit 1
fi

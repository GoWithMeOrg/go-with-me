#!/usr/bin/env bash
# Получение первого сертификата Let's Encrypt для домена.
# Запускать на сервере из каталога infra/nginx: порт 80 должен быть свободен,
# поэтому nginx на время выпуска останавливается.
#
# Использование: ./setup-ssl.sh tribeplans.dev admin@example.com
# Файлы кладутся в infra/certs под именами, которые ждёт conf.d/tribeplans.conf.

set -euo pipefail

DOMAIN="${1:-}"
EMAIL="${2:-}"

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Usage: $0 <domain> <email>"
    echo "Example: $0 tribeplans.dev admin@tribeplans.dev"
    exit 1
fi

# Скрипт может лежать где угодно, но пути считаем от infra/nginx.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
CERTS_DIR="$REPO_ROOT/infra/certs"

mkdir -p "$CERTS_DIR"

echo "Setting up SSL certificates for $DOMAIN"
echo "Email: $EMAIL"

# Порт 80 занят nginx — на время выпуска его нужно освободить.
docker compose -f "$REPO_ROOT/docker-compose.yml" stop nginx 2>/dev/null || true

docker run --rm \
    -v "$CERTS_DIR:/etc/letsencrypt" \
    -p 80:80 \
    certbot/certbot certonly \
    --standalone \
    --preferred-challenges http \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --non-interactive

# tribeplans.conf ждёт плоские имена <domain>.pem / <domain>-key.pem,
# а certbot складывает их в live/<domain>/ с симлинками на archive/.
if [ -f "$CERTS_DIR/live/$DOMAIN/fullchain.pem" ]; then
    cp "$CERTS_DIR/live/$DOMAIN/fullchain.pem" "$CERTS_DIR/$DOMAIN.pem"
    cp "$CERTS_DIR/live/$DOMAIN/privkey.pem" "$CERTS_DIR/$DOMAIN-key.pem"
    echo "Certificates copied to $CERTS_DIR"
    echo "Start the stack with: docker compose -f $REPO_ROOT/docker-compose.yml up -d"
else
    echo "Error: certificates not found in $CERTS_DIR/live/$DOMAIN"
    exit 1
fi

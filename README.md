# Go With Me

A monorepo application with Next.js frontend and NestJS backend.

## Project Structure

- `packages/web-frontend` - Next.js (TypeScript) application
- `packages/backend` - NestJS (TypeScript) application
- `infra/nginx` - Nginx reverse proxy configuration

## Local Development

### Prerequisites

- Node.js 24+
- pnpm
- Docker and Docker Compose (optional, for local MongoDB)

### Running Locally

1. Install dependencies:
```bash
pnpm install
```

2. Start development servers:
```bash
# Frontend (Next.js)
pnpm --filter web-frontend dev

# Backend (NestJS)
pnpm --filter @go-with-me/backend start:dev
```

### Running with Docker Compose (Local)

For local development with Docker, use the provided `docker-compose.yml`:

```bash
docker-compose up
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:4000`
- MongoDB on `localhost:27017`
- Nginx reverse proxy on `http://localhost:80`

## Production Deployment

This project is configured for deployment to a DigitalOcean Droplet using Docker Compose.

### Architecture

- **Single DigitalOcean Droplet** (e.g., `s-2vcpu-4gb`)
- **Docker Compose** orchestrates services
- **DigitalOcean Container Registry (DOCR)** stores Docker images
- **GitHub Actions** builds and deploys automatically
- **Nginx** reverse proxy handles HTTPS and routing
- **Let's Encrypt** provides SSL certificates

### Deployment Flow

1. **Developer pushes to `main` branch**
2. **GitHub Actions** (`build-and-push-images.yml`):
   - Runs tests
   - Builds Docker images for frontend and backend
   - Pushes images to DigitalOcean Container Registry
3. **GitHub Actions** (`deploy-to-droplet.yml`):
   - Connects to Droplet via SSH
   - Pulls latest images from DOCR
   - Updates services with `docker-compose up -d`

### Initial Setup

#### 1. DigitalOcean Container Registry

1. Create a Container Registry in DigitalOcean
2. Note the registry name (e.g., `my-registry`)
3. Get your DigitalOcean access token

#### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

- `DIGITALOCEAN_ACCESS_TOKEN` - Your DigitalOcean API token
- `SSH_HOST` - Your Droplet IP address or hostname
- `SSH_USER` - SSH username (typically `root`)
- `SSH_KEY` - Private SSH key for accessing the Droplet

#### 3. Update Configuration Files

Replace placeholders in the following files:

**`docker-compose.prod.yml`**:
- `MY_REGISTRY` → Your DOCR registry name
- `MY_DOMAIN.COM` → Your domain (e.g., `tribeplans.ru`)

**`.github/workflows/build-and-push-images.yml`**:
- `MY_REGISTRY` → Your DOCR registry name

**`infra/nginx/conf.d/default.conf`**:
- `MY_DOMAIN.COM` → Your domain (e.g., `tribeplans.ru`)

#### 4. Droplet Setup

SSH into your Droplet and run:

```bash
# Create deployment directory
sudo mkdir -p /opt/myapp
cd /opt/myapp

# Clone the repository (or copy files)
git clone <your-repo-url> .

# Or copy docker-compose.prod.yml and infra/ directory manually
```

#### 5. Configure Environment Variables

Create a `.env` file on the Droplet at `/opt/myapp/.env`:

```bash
# MongoDB connection string from DigitalOcean Managed Database
MONGODB_URI=mongodb+srv://user:password@host/database?retryWrites=true&w=majority

# Add other environment variables as needed
```

#### 6. Set Up SSL Certificates

**Option A: Initial Let's Encrypt Certificate (Manual)**

```bash
# On the Droplet, run certbot to get initial certificate
docker run -it --rm \
  -v certbot-data:/etc/letsencrypt \
  -v ./infra/nginx/certs:/etc/nginx/certs \
  certbot/certbot certonly \
  --standalone \
  -d MY_DOMAIN.COM \
  -d www.MY_DOMAIN.COM \
  --email your-email@example.com \
  --agree-tos
```

**Option B: Self-Signed Certificate (Testing)**

For initial testing, you can use self-signed certificates:

```bash
mkdir -p infra/nginx/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout infra/nginx/certs/privkey.pem \
  -out infra/nginx/certs/fullchain.pem \
  -subj "/CN=MY_DOMAIN.COM"
```

#### 7. Log in to DOCR on Droplet

```bash
# Log in to DigitalOcean Container Registry
docker login registry.digitalocean.com -u YOUR_DO_TOKEN -p YOUR_DO_TOKEN
```

Or add credentials to Docker config:

```bash
mkdir -p ~/.docker
cat > ~/.docker/config.json << EOF
{
  "auths": {
    "registry.digitalocean.com": {
      "auth": "$(echo -n 'YOUR_DO_TOKEN:YOUR_DO_TOKEN' | base64)"
    }
  }
}
EOF
```

#### 8. Start Services

```bash
cd /opt/myapp
docker-compose -f docker-compose.prod.yml up -d
```

### Updating Configuration

#### Adding Environment Variables

1. Add variables to `docker-compose.prod.yml` under the appropriate service's `environment` section
2. Update `.env` file on the Droplet
3. Restart services: `docker-compose -f docker-compose.prod.yml up -d`

#### Updating Domains

1. Update `MY_DOMAIN.COM` in:
   - `docker-compose.prod.yml`
   - `infra/nginx/conf.d/default.conf`
2. Update DNS records to point to your Droplet IP
3. Restart nginx: `docker-compose -f docker-compose.prod.yml restart reverse-proxy`

#### Renewing SSL Certificates

Certificates are automatically renewed by the `certbot` service in docker-compose. To manually renew:

```bash
docker-compose -f docker-compose.prod.yml exec certbot certbot renew
docker-compose -f docker-compose.prod.yml restart reverse-proxy
```

### Scaling Services

To scale backend instances (behind the reverse proxy):

```bash
docker-compose -f docker-compose.prod.yml up -d --scale backend=2
```

The Nginx configuration will automatically load balance across multiple backend instances.

### Monitoring and Logs

View logs:

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f reverse-proxy
```

Check service status:

```bash
docker-compose -f docker-compose.prod.yml ps
```

### Troubleshooting

#### Services won't start

1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify environment variables are set correctly
3. Ensure MongoDB connection string is valid
4. Check that images exist in DOCR: `docker pull registry.digitalocean.com/MY_REGISTRY/frontend:latest`

#### SSL certificate issues

1. Verify domain DNS points to Droplet IP
2. Check certificate files exist: `ls -la infra/nginx/certs/`
3. Review certbot logs: `docker-compose -f docker-compose.prod.yml logs certbot`

#### Images not pulling

1. Verify DOCR login: `docker login registry.digitalocean.com`
2. Check image tags in `docker-compose.prod.yml` match DOCR
3. Ensure GitHub Actions workflow completed successfully

### Manual Deployment

If you need to deploy manually:

```bash
# On the Droplet
cd /opt/myapp

# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Update services
docker-compose -f docker-compose.prod.yml up -d

# Clean up old images
docker image prune -f
```

## Development Scripts

```bash
# Frontend
pnpm --filter web-frontend dev          # Start dev server
pnpm --filter web-frontend build        # Build for production
pnpm --filter web-frontend start        # Start production server

# Backend
pnpm --filter @go-with-me/backend start:dev    # Start dev server
pnpm --filter @go-with-me/backend build        # Build for production
pnpm --filter @go-with-me/backend start:prod   # Start production server
```

## License

[Your License Here]

1

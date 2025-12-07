# Production Deployment Checklist

Use this checklist when setting up production deployment for the first time.

## Pre-Deployment

- [ ] Create DigitalOcean Container Registry
- [ ] Note registry name (replace `MY_REGISTRY` in configs)
- [ ] Create DigitalOcean Managed MongoDB database
- [ ] Get MongoDB connection string
- [ ] Create DigitalOcean Droplet (e.g., `s-2vcpu-4gb`)
- [ ] Set up DNS records pointing to Droplet IP
- [ ] Generate SSH key pair for Droplet access

## GitHub Configuration

- [ ] Add `DIGITALOCEAN_ACCESS_TOKEN` secret
- [ ] Add `SSH_HOST` secret (Droplet IP or hostname)
- [ ] Add `SSH_USER` secret (typically `root`)
- [ ] Add `SSH_KEY` secret (private SSH key)

## Configuration Updates

- [ ] Update `docker-compose.prod.yml`:
  - [ ] Replace `MY_REGISTRY` with your DOCR registry name
  - [ ] Replace `MY_DOMAIN.COM` with your domain
- [ ] Update `.github/workflows/build-and-push-images.yml`:
  - [ ] Replace `MY_REGISTRY` with your DOCR registry name
- [ ] Update `infra/nginx/conf.d/default.conf`:
  - [ ] Replace `MY_DOMAIN.COM` with your domain (2 occurrences)

## Droplet Setup

- [ ] SSH into Droplet
- [ ] Install Docker and Docker Compose
- [ ] Create `/opt/myapp` directory
- [ ] Copy `docker-compose.prod.yml` to `/opt/myapp/`
- [ ] Copy `infra/` directory to `/opt/myapp/infra/`
- [ ] Create `.env` file with MongoDB connection string
- [ ] Log in to DigitalOcean Container Registry on Droplet
- [ ] Set up SSL certificates (see README.md)

## Initial Deployment

- [ ] Push code to `main` branch (triggers GitHub Actions)
- [ ] Verify images are built and pushed to DOCR
- [ ] Verify deployment workflow runs successfully
- [ ] SSH into Droplet and verify services are running:
  ```bash
  cd /opt/myapp
  docker-compose -f docker-compose.prod.yml ps
  ```
- [ ] Check logs for errors:
  ```bash
  docker-compose -f docker-compose.prod.yml logs
  ```
- [ ] Verify HTTPS is working: `https://your-domain.com`
- [ ] Test frontend: `https://your-domain.com`
- [ ] Test backend API: `https://your-domain.com/api/health` (or your health endpoint)

## Post-Deployment Verification

- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connections work
- [ ] SSL certificate is valid (not self-signed)
- [ ] HTTP redirects to HTTPS
- [ ] All environment variables are set correctly

## Troubleshooting

If services won't start:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify environment variables in `.env`
3. Verify MongoDB connection string
4. Check that images exist in DOCR
5. Verify DNS points to Droplet IP

If SSL issues:
1. Verify DNS is configured correctly
2. Check certificate files: `ls -la infra/nginx/certs/`
3. Review certbot logs: `docker-compose -f docker-compose.prod.yml logs certbot`

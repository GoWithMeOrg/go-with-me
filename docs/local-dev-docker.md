# Docker-Based Local Environment

This guide explains how to run the project locally with Docker, Docker Compose, and nginx so that the site is available at **https://tribeplans.dev**.

## Prerequisites

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (compose v2 is bundled).
2. Install [mkcert](https://github.com/FiloSottile/mkcert) (recommended) or OpenSSL to create local TLS certificates.
3. Enable pnpm for the workspace on first run inside containers (handled automatically by the compose commands).

### 1. Hostname Mapping

Add `tribeplans.dev` to your hosts file:

```bash
echo "127.0.0.1 tribeplans.dev" | sudo tee -a /etc/hosts
```

### 2. TLS Certificates

Create the certificate pair inside `infra/certs` (the directory is mounted into the nginx container):

```bash
mkdir -p infra/certs
cd infra/certs
mkcert -key-file tribeplans.dev-key.pem -cert-file tribeplans.dev.pem tribeplans.dev
mkcert -install
```

> If you cannot use mkcert, replace the command above with OpenSSL equivalents. Ensure both `.pem` files match the names referenced in `infra/nginx/conf.d/tribeplans.conf`.

### 3. Environment Variables

- Update the default values in `docker-compose.yml` to match your local secrets (e.g. `SESSION_SECRET`, OAuth credentials, Mongo connection string).
- For additional Next.js variables, add a `.env.local` file under `packages/web-frontend/`. The compose service mounts the repo, so standard env files are available to Next.js.

## Running the Stack

From the repository root:

```bash
docker compose up --build
```

Compose starts four containers:

| Service        | Description                                          | Port   |
| -------------- | ---------------------------------------------------- | ------ |
| `gwm-mongo`    | MongoDB instance for local development               | 27017  |
| `gwm-backend`  | NestJS API running on port `4000` inside the network | 4000   |
| `gwm-frontend` | Next.js dev server (hot reload)                      | 3000   |
| `gwm-mongo`    | MongoDB instance for local development               | 27017  |
| `gwm-nginx`    | Reverse proxy terminating HTTPS                      | 80/443 |

Visit **https://tribeplans.dev** in your browser. The first visit will prompt you to trust the locally generated certificate—accept it to continue.

## Useful Commands

- `docker compose logs -f gwm-frontend` – Tail frontend logs.
- `docker compose exec gwm-backend pnpm --filter @go-with-me/backend test` – Run backend tests inside the container.
- `docker compose down` – Stop all services (add `-v` to drop the Mongo volume).

## Notes

- The backend now reads `CORS_ORIGIN`, `SESSION_COOKIE_*`, and `PORT` from the environment (see `packages/backend/src/main.ts`).
- `SESSION_COOKIE_SECURE` defaults to `true` in docker so cookies work over HTTPS.
- Both Node containers run `pnpm install` on startup to ensure workspace dependencies are present. The `node_modules` and pnpm store directories are persisted via named volumes for faster restarts.

---

# Podman-Based Local Environment

The same stack runs cleanly on Podman with minor changes. Follow the Docker instructions above, then apply the Podman-specific guidance below.

## Prerequisites

1. Install Podman via [Podman Desktop](https://podman.io/podman-desktop) or Homebrew (`brew install podman podman-compose`).
2. Initialize and start the Podman machine (required on macOS):

    ```bash
    podman machine init --now
    ```

    > If you already have a machine, ensure it is running with `podman machine start`.

3. Export the Podman socket so compose commands can communicate with the Podman engine:

    ```bash
    export DOCKER_HOST=$(podman machine inspect --format '{{.ConnectionInfo.PodmanSocket.URI}}')
    ```

    Adding this export to your shell profile keeps it available across sessions.

## Running the Stack

All compose commands work unchanged when `DOCKER_HOST` is pointed at Podman:

```bash
podman compose up --build
```

Podman’s `compose` subcommand understands the existing `docker-compose.yml`. The four services (`gwm-backend`, `gwm-frontend`, `gwm-mongo`, `gwm-nginx`) start with the same ports and environment settings.

## Useful Commands

- `podman compose logs -f gwm-frontend` – Tail frontend logs.
- `podman compose exec gwm-backend pnpm --filter @go-with-me/backend test` – Run backend tests inside the container.
- `podman compose down` – Stop all services (add `-v` to drop the Mongo volume).

## Notes

- Podman automatically builds images rootless; no extra configuration is required for the provided Dockerfile targets.
- Volume mounts defined in `docker-compose.yml` map into the Podman machine. If you need to clean the pnpm store, run `podman volume rm gwm_frontend_node_modules gwm_backend_node_modules gwm_pnpm_store`.
- Certificates, hosts file configuration, and environment variable management are identical to the Docker workflow above.

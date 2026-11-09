# Go With Me

Monorepo with a Next.js frontend and a NestJS backend. Events, companions and
invitations, with Google OAuth login and a GraphQL API.

## Stack

| Part       | Technologies                                                                  |
| ---------- | ----------------------------------------------------------------------------- |
| `frontend` | Next.js 16 (App Router), React 19, Apollo Client 4, simpledotcss, SVGR        |
| `backend`  | NestJS 12 (ESM), GraphQL code-first, Apollo Server 5, Mongoose 9, MongoDB 7   |
| Shared     | TypeScript 6.0.3, pnpm 12, ESLint 10, Prettier 3                              |
| Auth       | Passport + Google OAuth, sessions in MongoDB (`connect-mongo`), `connect.sid` |

## Project Structure

```
packages/
  frontend/   Next.js application (@go-with-me/frontend)
  backend/    NestJS API, GraphQL code-first (@go-with-me/backend)
  shared/     GraphQL schema types shared across packages (@go-with-me/shared)
infra/
  nginx/      reverse proxy and TLS for local development
  certs/      local certificates for tribeplans.dev
```

## Requirements

- Node.js **26+** (see `.nvmrc`, `engines` in every `package.json` and CI)
- pnpm **12.16.1** (`packageManager` in the root `package.json`)
- Docker and Docker Compose — optional, for local MongoDB and nginx

With `nvm`:

```bash
nvm use
corepack enable
pnpm install
```

`pnpm install` runs `prepare`, which triggers `pnpm codegen` — the GraphQL types
are generated automatically and must never be edited by hand.

## Local Development

### Without Docker

All you need is MongoDB (locally, or in a container: `docker compose up -d mongo`).

Create `.env.local` in the repository root — it is read by the backend
(`ConfigModule`) and by docker-compose. The full variable list is in
[Environment Variables](#environment-variables).

```bash
# Frontend (Next.js, port 3000)
pnpm frontend:dev

# Backend (NestJS, port 4000)
pnpm backend:dev
```

### With Docker Compose

Starts all four services; the site is available at **https://tribeplans.dev**.

```bash
docker compose up --build
```

| Service        | Description                        | Port   |
| -------------- | ---------------------------------- | ------ |
| `gwm-frontend` | Next.js dev server with hot reload | 3000   |
| `gwm-backend`  | NestJS API                         | 4000   |
| `gwm-mongo`    | MongoDB 7                          | 27017  |
| `gwm-nginx`    | reverse proxy, terminates HTTPS    | 80/443 |

`https://tribeplans.dev` needs a hosts-file entry and local certificates — see
[`docs/local-dev-docker.md`](docs/local-dev-docker.md) for the step-by-step guide.

## Scripts

All commands run from the repository root.

| Command                | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `pnpm build`           | builds every package in parallel                               |
| `pnpm frontend:dev`    | `next dev --turbo` on port 3000                                |
| `pnpm backend:dev`     | `nest start --watch` on port 4000                              |
| `pnpm lint`            | ESLint over every package in parallel, no autofix              |
| `pnpm frontend:lint`   | ESLint over frontend with `--fix`                              |
| `pnpm backend:lint`    | ESLint over backend with `--fix`                               |
| `pnpm typecheck`       | `tsc --noEmit` per package in parallel (after `next typegen`)  |
| `pnpm typegen`         | generates `next-env.d.ts` and route types (not tracked by git) |
| `pnpm test`            | unit tests (Jest on the backend)                               |
| `pnpm test:e2e`        | builds the frontend and runs Playwright against `next start`   |
| `pnpm codegen`         | generates types from the GraphQL schema                        |
| `pnpm check:codegen`   | fails when generated files are stale relative to the schema    |
| `pnpm format:check`    | Prettier check over the whole repo                             |
| `pnpm frontend:format` | Prettier over frontend                                         |
| `pnpm backend:format`  | Prettier over backend                                          |

Single package:

```bash
pnpm --filter backend test    # Jest (ESM), 3 tests
pnpm --filter backend build   # nest build
pnpm --filter backend start:prod
```

Frontend end-to-end tests (Playwright): `pnpm test:e2e`. It builds the frontend
first, then Playwright starts `next start` on port 3000 and stops it afterwards —
no need to run a server yourself. Locally the config reuses an already running
server on port 3000 if there is one, while in CI the port must be free.

## GraphQL and Codegen

The schema is **code-first**, assembled from NestJS decorators. On startup in
development mode the backend writes it to
`packages/backend/src/schema/schema.gql` (in production it only lives in memory).
From there `codegen.ts` generates two files:

- `packages/shared/graphql.ts` — schema types, imported as `@go-with-me/shared/graphql`;
- `packages/frontend/src/app/graphql/operations.ts` — operation types and `TypedDocumentNode`s.

Both files are generated: they are excluded from ESLint and Prettier and must not
be edited by hand.

After changing resolvers, GraphQL decorators or DTOs:

```bash
pnpm codegen
```

CI runs `pnpm check:codegen` and fails when the generated files do not match the
schema.

Queries, mutations and subscriptions live in
`packages/frontend/src/app/graphql/{queries,mutations,subscriptions}/` — that is
where codegen picks the operations from.

## Environment Variables

Stored in `.env.local` in the repository root. The backend reads them through
`ConfigService`; the frontend only receives `NEXT_PUBLIC_*` at build time.

### Backend

| Variable               | Required | Purpose                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `NODE_ENV`             | yes      | `development` enables dev mode (playground, CSRF off, `schema.gql`) |
| `PORT`                 | yes      | HTTP server port                                                    |
| `ALLOWED_ORIGIN`       | yes      | frontend origin for CORS and OAuth redirects                        |
| `MONGODB_URI`          | yes      | MongoDB connection string                                           |
| `SESSION_SECRET`       | yes      | session cookie signature                                            |
| `TRUST_PROXY`          | no       | `true` — trust `X-Forwarded-*` (required behind nginx)              |
| `GOOGLE_CLIENT_ID`     | yes      | Google OAuth                                                        |
| `GOOGLE_CLIENT_SECRET` | yes      | Google OAuth                                                        |
| `GOOGLE_CALLBACK_URL`  | yes      | Google OAuth callback URL                                           |
| `S3_ACCESS_KEY`        | yes      | S3-compatible storage for uploads                                   |
| `S3_SECRET_KEY`        | yes      |                                                                     |
| `S3_ENDPOINT`          | yes      |                                                                     |
| `S3_BUCKET_NAME`       | yes      |                                                                     |
| `S3_REGION`            | no       | defaults to `us-east-1`                                             |

### Frontend

`NEXT_PUBLIC_GRAPHQL_ENDPOINT`, `NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT`,
`NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`,
`NEXT_PUBLIC_AUTH_GOOGLE_URL`, `NEXT_PUBLIC_AUTH_FACEBOOK_URL`,
`NEXT_PUBLIC_AUTH_GITHUB_URL`, `NEXT_PUBLIC_AUTH_LOGOUT_URL`.

`.env.local` is not tracked by git — do not commit it.

## CI and Deployment

Two workflows in `.github/workflows/`:

- **`ci.yaml`** — on pull requests and as a reusable workflow. Seven parallel
  jobs: `lint`, `typecheck`, `format`, `build`, `test`, `codegen` and `e2e`.
  Each one installs dependencies with `--ignore-scripts` (so `prepare` does not
  run codegen);
- **`deploy-to-dokploy.yaml`** — calls `ci.yaml` and only then triggers the Dokploy webhook.

Deployment depends on the trigger and on which paths changed (`dorny/paths-filter`):

| Trigger        | What gets deployed                      |
| -------------- | --------------------------------------- |
| push to `main` | dev, only the applications that changed |
| tag `v*`       | prod, backend and frontend              |
| tag `b*`       | prod, backend only                      |
| tag `f*`       | prod, frontend only                     |

Repository secrets: `DOKPLOY_URL_DEPLOY`, `DOKPLOY_TOKEN` and four application
IDs — `DOKPLOY_DEV_BACKEND_APP_ID`, `DOKPLOY_DEV_FRONTEND_APP_ID`,
`DOKPLOY_PROD_BACKEND_APP_ID`, `DOKPLOY_PROD_FRONTEND_APP_ID`.

Production images are built from `packages/*/Dockerfile` (multi-stage,
`node:26-alpine`, Next.js `output: 'standalone'`).

## Docs

- [`docs/local-dev-docker.md`](docs/local-dev-docker.md) — running the stack locally with Docker and Podman

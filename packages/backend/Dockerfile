# ==========================
# Backend Production Dockerfile
# ==========================

# --------------------------
# Stage 0: Base image
# --------------------------
FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace

# --------------------------
# Stage 1: Install dependencies
# --------------------------
FROM base AS deps

# Copy workspace root files for dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /workspace/

# Copy backend package.json
COPY packages/backend/package.json /workspace/packages/backend/package.json

# Configure pnpm to run build scripts if needed
RUN pnpm config set ignore-scripts false

# Install dependencies
RUN pnpm install --frozen-lockfile

# --------------------------
# Stage 2: Build backend
# --------------------------
FROM base AS builder

# Copy installed dependencies from deps stage
COPY --from=deps /workspace /workspace

# Copy entire backend source code
COPY packages/backend /workspace/packages/backend

WORKDIR /workspace/packages/backend
ENV NODE_ENV=production

# Build Next.js backend (standalone output)
RUN pnpm --filter backend run build

# --------------------------
# Stage 3: Runtime
# --------------------------
FROM node:24-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nestjs \
    && adduser --system --uid 1001 nestjs

# Copy built backend
COPY --from=builder --chown=nestjs:nestjs /workspace/packages/backend/dist ./dist
COPY --from=builder --chown=nestjs:nestjs /workspace/packages/backend/package.json ./

USER nestjs

EXPOSE 4000

ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

CMD ["node", "dist/main.js"]




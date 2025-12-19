# Backend Production Dockerfile
# Multi-stage build for optimized Next.js production image

FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /workspace

# Copy workspace files for dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /workspace

COPY packages/backend/package.json packages/backend/package.json
# Configure pnpm to allow build scripts (required for some packages like @apollo/protobufjs)
RUN pnpm config set ignore-scripts false
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
COPY --from=deps /workspace ./
COPY packages/backend ./packages/backend

ENV NODE_ENV=production
# Build the Next.js application
# The standalone output will be in .next/standalone
#RUN pnpm build
RUN pnpm --filter backend run build

# Stage 3: Runtime
FROM node:24-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nestjs && adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nestjs /workspace/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nestjs /workspace/packages/backend/dist ./dist
COPY --from=builder --chown=nestjs:nestjs /workspace/packages/backend/package.json ./

USER nestjs

ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

CMD ["node", "dist/main.js"]



# Backend Production Dockerfile
# Multi-stage build for optimized production image

FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /workspace

# Copy workspace files
COPY package.json  ./

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /workspace
COPY package.json  ./
RUN pnpm install

# Stage 2: Build the application
FROM base AS builder
WORKDIR /workspace
COPY --from=deps /workspace ./
COPY tsconfig.build.json tsconfig.json  ./
COPY src ./src

COPY package.json  ./

ENV NODE_ENV=production
RUN pnpm build

# Stage 3: Production image
FROM node:24-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nestjs && \
  adduser --system --uid 1001 nestjs

# Copy necessary files from builder
COPY --from=builder --chown=nestjs:nestjs /workspace ./

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", "dist/main.js"]


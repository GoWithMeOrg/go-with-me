# Frontend Production Dockerfile
# Multi-stage build for optimized Next.js production image

FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /workspace

# Copy workspace files for dependency resolution
COPY package.json  ./

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /workspace
COPY package.json  ./
# Configure pnpm to allow build scripts (required for some packages like @apollo/protobufjs)
RUN pnpm config set ignore-scripts false
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /workspace

COPY --from=deps /workspace ./
COPY tsconfig.json  ./
COPY next.config.js ./next.config.js
COPY next-env.d.ts ./next-env.d.ts
COPY src ./src
COPY package.json  ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
# The standalone output will be in .next/standalone
RUN pnpm build

# Stage 3: Production image
FROM node:24-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /workspace ./

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Health check (adjust path if your app has a health endpoint)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["npm", "run", "start"]

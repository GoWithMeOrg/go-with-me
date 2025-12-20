# Stage 0: Base
FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /workspace

# Stage 1: Build
FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile

RUN pnpm --filter web-frontend run build

# Stage 2: Runtime
FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs

# Копируем standalone файлы. 
# Next.js копирует туда node_modules и файлы монорепозитория.
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/frontend/.next/static ./packages/frontend/.next/static
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/frontend/public ./packages/frontend/public
COPY --from=builder --chown=nextjs:nextjs /workspace/package.json ./

WORKDIR /app/packages/frontend
USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

ENTRYPOINT []

CMD ["node", "server.js"]
# Stage 0: Base
FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /workspace

# Stage 1: Build
FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile

# Важно: переменные NEXT_PUBLIC_ должны быть здесь, если они нужны при сборке
# ENV NEXT_PUBLIC_API_URL=https://tribeplans.ru/api
RUN pnpm --filter web-frontend run build

# Stage 2: Runtime
FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Копируем standalone файлы. 
# Next.js копирует туда node_modules и файлы монорепозитория.
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/.next/static ./packages/web-frontend/.next/static
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/public ./packages/web-frontend/public

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

ENTRYPOINT []
# Попробуйте этот путь. Если не сработает — заменим на "node server.js"
CMD ["node", "server.js"]
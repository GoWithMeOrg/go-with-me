# --------------------------
# Stage 0: Base
# --------------------------
FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /workspace

# --------------------------
# Stage 1: Build
# --------------------------
FROM base AS builder
# В монорепозитории для сборки фронтенда нужны все файлы (из-за ссылок между пакетами)
COPY . .

# Устанавливаем зависимости и собираем
RUN pnpm install --frozen-lockfile
RUN pnpm --filter web-frontend run build

# --------------------------
# Stage 2: Runtime
# --------------------------
FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# В режиме standalone Next.js копирует зависимости внутрь папки .next/standalone
# Нам нужно скопировать содержимое этой папки в корень /app
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/.next/static ./packages/web-frontend/.next/static
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/public ./packages/web-frontend/public

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Для standalone режима запуск идет напрямую через server.js
# Папка внутри standalone обычно повторяет путь монорепозитория
CMD ["node", "packages/web-frontend/server.js"]

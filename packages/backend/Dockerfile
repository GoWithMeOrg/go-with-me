# --------------------------
# Stage 0: Base
# --------------------------
FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /workspace

# --------------------------
# Stage 1: Build & Deploy
# --------------------------
FROM base AS builder
# Копируем всё для корректной работы pnpm
COPY . .
# Устанавливаем зависимости и собираем бэкенд
RUN pnpm install --frozen-lockfile
RUN pnpm --filter backend run build

# ВАЖНЫЙ ШАГ: pnpm deploy вырезает бэкенд из монорепозитория 
# в отдельную папку /out со всеми реальными зависимостями
RUN pnpm --filter backend --prod deploy /out

# --------------------------
# Stage 2: Runtime
# --------------------------
FROM node:24-alpine AS runner
WORKDIR /app

# Копируем уже готовую изолированную папку /out
COPY --from=builder /out ./
# Копируем скомпилированные файлы из папки билда
COPY --from=builder /workspace/packages/backend/dist ./dist

# Права доступа
RUN addgroup --system --gid 1001 nestjs && adduser --system --uid 1001 nestjs
RUN chown -R nestjs:nestjs /app
USER nestjs

ENV NODE_ENV=production
ENV PORT=4000

# Запуск из /app/dist/main.js
CMD ["node", "dist/main.js"]




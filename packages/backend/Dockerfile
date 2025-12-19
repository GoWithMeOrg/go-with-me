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
# Копируем вообще все файлы монорепозитория (это важно для pnpm)
COPY . .

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Собираем бэкенд
# Замените 'backend', если в package.json другое имя
RUN pnpm --filter backend run build

# --------------------------
# Stage 2: Runtime
# --------------------------
FROM node:24-alpine AS runner
WORKDIR /app

# Создаем пользователя
RUN addgroup --system --gid 1001 nestjs && adduser --system --uid 1001 nestjs

# Копируем зависимости из корня (там лежат реальные файлы библиотек)
COPY --from=builder --chown=nestjs:nestjs /workspace/node_modules ./node_modules
# Копируем папку бэкенда целиком (там лежат ссылки и package.json)
COPY --from=builder --chown=nestjs:nestjs /workspace/packages/backend ./packages/backend
# Копируем корень package.json (иногда нужен для резолвинга)
COPY --from=builder --chown=nestjs:nestjs /workspace/package.json ./

# Создаем симлинк или просто переходим к запуску
# Мы будем запускать из /app/packages/backend
WORKDIR /app/packages/backend

USER nestjs

ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

EXPOSE 4000

# Путь к main.js теперь внутри папки пакета
CMD ["node", "dist/main.js"]








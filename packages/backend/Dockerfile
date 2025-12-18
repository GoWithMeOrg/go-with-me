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
# Копируем файлы манифеста
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json ./packages/backend/

# Устанавливаем ВСЕ зависимости (включая devDependencies для билда)
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY packages/backend ./packages/backend

# Собираем проект
RUN pnpm --filter backend run build

# Удаляем dev-зависимости, оставляем только продакшн
RUN pnpm install --prod --frozen-lockfile

# --------------------------
# Stage 2: Runtime
# --------------------------
FROM node:24-alpine AS runner
WORKDIR /app

# Создаем пользователя
RUN addgroup --system --gid 1001 nestjs && adduser --system --uid 1001 nestjs

# Копируем зависимости из корня и из папки пакета
# Это решит проблему с MODULE_NOT_FOUND
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/packages/backend/node_modules ./packages/backend/node_modules
COPY --from=builder /workspace/packages/backend/dist ./dist
COPY --from=builder /workspace/packages/backend/package.json ./

RUN chown -R nestjs:nestjs /app
USER nestjs

ENV NODE_ENV=production
ENV PORT=4000

CMD ["node", "dist/main.js"]




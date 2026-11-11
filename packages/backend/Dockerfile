# syntax=docker/dockerfile:1.7

# --------------------------
# Stage 0: Base
# --------------------------
FROM node:26-alpine AS base

RUN npm install -g pnpm@12.16.1

WORKDIR /workspace

# --------------------------
# Stage 1: Build
# --------------------------
FROM base AS builder

# Сначала только манифесты: слой установки не инвалидируется при изменении кода.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline --ignore-scripts

COPY . .

RUN pnpm --filter @go-with-me/backend build

# Дев-зависимости в рантайме не нужны: pnpm deploy собирает изолированный
# node_modules только с production-зависимостями.
RUN pnpm --filter @go-with-me/backend --prod deploy /out

# --------------------------
# Stage 2: Runtime
# --------------------------
FROM node:26-alpine AS runner
WORKDIR /app

# Создаем пользователя
RUN addgroup --system --gid 1001 nestjs && adduser --system --uid 1001 nestjs

# Только production-зависимости пакета (без стора и без dev-зависимостей
# остальных пакетов монорепы).
COPY --from=builder --chown=nestjs:nestjs /out/ ./

# dist лежит в .gitignore пакета, поэтому pnpm deploy его не копирует.
COPY --from=builder --chown=nestjs:nestjs /workspace/packages/backend/dist ./dist

USER nestjs

ENV NODE_ENV=production
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

EXPOSE 4000

CMD ["node", "dist/main.js"]

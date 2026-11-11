# syntax=docker/dockerfile:1.7

# Stage 0: Base
FROM node:26-alpine AS base

RUN npm install -g pnpm@12.16.1

WORKDIR /workspace

# Stage 1: Build
FROM base AS builder

# NEXT_PUBLIC_* инлайнятся в бандл на этапе сборки, поэтому их нужно передать
# в build-args — из runtime-окружения они уже не подхватятся.
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_BETTER_STACK_INGESTING_URL
ARG NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN

ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL} \
    NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT} \
    NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT} \
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} \
    NEXT_PUBLIC_BETTER_STACK_INGESTING_URL=${NEXT_PUBLIC_BETTER_STACK_INGESTING_URL} \
    NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN=${NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN}

# Сначала только манифесты: слой установки не инвалидируется при изменении кода.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline --ignore-scripts

COPY . .

RUN pnpm --filter frontend run build

# Stage 2: Runtime
FROM node:26-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs

# Копируем standalone файлы.
# Next.js копирует туда node_modules и файлы монорепозитория.
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/frontend/.next/static ./packages/frontend/.next/static
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/frontend/public ./packages/frontend/public

WORKDIR /app/packages/frontend
USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["node", "server.js"]

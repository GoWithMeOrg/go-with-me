# Use Node.js LTS version
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Define all environment variables in one place
ARG BASE_FETCH_URL
ARG DO_SPACES_ACCESS_KEY
ARG DO_SPACES_BUCKET
ARG DO_SPACES_SECRET_KEY
ARG DO_SPACES_URL
ARG FACEBOOK_CLIENT_ID
ARG FACEBOOK_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG MONGODB_URI
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ARG TWITTER_CLIENT_ID
ARG TWITTER_CLIENT_SECRET

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  BASE_FETCH_URL=$BASE_FETCH_URL \
  DO_SPACES_ACCESS_KEY=$DO_SPACES_ACCESS_KEY \
  DO_SPACES_BUCKET=$DO_SPACES_BUCKET \
  DO_SPACES_SECRET_KEY=$DO_SPACES_SECRET_KEY \
  DO_SPACES_URL=$DO_SPACES_URL \
  FACEBOOK_CLIENT_ID=$FACEBOOK_CLIENT_ID \
  FACEBOOK_CLIENT_SECRET=$FACEBOOK_CLIENT_SECRET \
  GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID \
  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET \
  MONGODB_URI=$MONGODB_URI \
  NEXTAUTH_SECRET=$NEXTAUTH_SECRET \
  NEXTAUTH_URL=$NEXTAUTH_URL \
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY \
  NEXT_PUBLIC_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_GRAPHQL_ENDPOINT \
  TWITTER_CLIENT_ID=$TWITTER_CLIENT_ID \
  TWITTER_CLIENT_SECRET=$TWITTER_CLIENT_SECRET

RUN rm -rf .next && npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME="0.0.0.0"

# Copy environment variables from builder
COPY --from=builder /app/.env* ./

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs && \
  mkdir .next && \
  chown nextjs:nodejs .next

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"] 
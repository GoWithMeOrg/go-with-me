FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nextjs && adduser --system --uid 1001 nextjs

# Копируем standalone-вывод Next.js как есть
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/.next/standalone ./

# Копируем static и public туда, где их ждёт сервер
COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nextjs /workspace/packages/web-frontend/public ./public

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", "server.js"]

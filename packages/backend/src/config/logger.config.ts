import { createRequire } from 'node:module';
import { ConfigService } from '@nestjs/config';

import { isDev } from '@/utils/is-dev.utils.js';

const nodeRequire = createRequire(import.meta.url);

// pino-pretty лежит в devDependencies: в production-образ он не попадает
// (`pnpm deploy --prod` в packages/backend/Dockerfile). Если контейнер запущен
// с NODE_ENV=development, pino на старте падает с
// `unable to determine transport target for "pino-pretty"`. Поэтому транспорт
// подключаем только когда пакет действительно установлен, иначе пишем JSON.
export const isPrettyTransportAvailable = () => {
    try {
        nodeRequire.resolve('pino-pretty');
        return true;
    } catch {
        return false;
    }
};

export async function getLoggerConfig(configService: ConfigService) {
    const prettyAvailable = isPrettyTransportAvailable();

    return {
        pinoHttp: isDev(configService)
            ? {
                  level: 'debug',
                  redact: {
                      paths: ['req.headers', 'res.headers'],
                      remove: true,
                  },
                  ...(prettyAvailable
                      ? {
                            transport: {
                                target: 'pino-pretty',
                                options: {
                                    colorize: true,
                                    translateTime: 'SYS:standard',
                                    singleLine: false,
                                },
                            },
                        }
                      : {}),
                  // Отключить автоматическое логирование HTTP запросов
                  autoLogging: false,
              }
            : {
                  level: 'info',
                  autoLogging: false,
              },
    };
}

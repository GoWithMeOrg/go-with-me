import { ConfigService } from '@nestjs/config';

import { isDev } from 'src/utils/is-dev.utils';

export async function getLoggerConfig(configService: ConfigService) {
    return {
        pinoHttp: isDev(configService)
            ? {
                  level: 'debug',
                  redact: {
                      paths: ['req.headers', 'res.headers'],
                      remove: true,
                  },
                  transport: {
                      target: 'pino-pretty',
                      options: {
                          colorize: true,
                          translateTime: 'SYS:standard',
                          singleLine: false,
                      },
                  },
                  // Отключить автоматическое логирование HTTP запросов
                  autoLogging: false,
              }
            : {
                  level: 'info',
                  autoLogging: false,
              },
    };
}

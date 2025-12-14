import { ConfigService } from '@nestjs/config';

import { isDev } from 'src/utils/is-dev.utils';

export async function getLoggerConfig(configService: ConfigService) {
    return {
        pinoHttp: isDev(configService)
            ? {
                  level: 'debug',
                  transport: {
                      target: 'pino-pretty',
                      options: {
                          colorize: true,
                          translateTime: 'SYS:standard',
                          singleLine: false,
                      },
                  },
              }
            : {
                  level: 'info',
              },
    };
}

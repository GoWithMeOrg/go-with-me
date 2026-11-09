import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { ValidationError } from 'class-validator';
import session from 'express-session';
import { Logger } from 'nestjs-pino';
import passport from 'passport';

import { AppModule } from '@/app.module.js';
import { SessionSerializer } from '@/auth/serializer/session.serializer.js';
import { getMongoStore } from '@/config/mongo-store.config.js';
import { isDev } from '@/utils/is-dev.utils.js';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
    });

    app.useLogger(app.get(Logger));

    // Включаем валидацию DTO. Без whitelist: часть DTO не размечена
    // class-validator, и whitelist стёр бы все их поля (проверено —
    // ValidationPipe с whitelist возвращает {} для класса без декораторов).
    // Лишние поля в GraphQL-запросах и так отклоняет сам GraphQL.
    //
    // exceptionFactory нужен из-за NestJS 12: initMessage() берёт message
    // только если это строка, а ValidationPipe по умолчанию кладёт массив,
    // из-за чего клиент видит generic "Bad Request Exception".
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: (errors) => {
                // Собираем сообщения рекурсивно: у вложенных DTO ошибки
                // лежат в children, а не в constraints родителя.
                const collect = (list: ValidationError[]): string[] =>
                    list.flatMap((error) => [
                        ...Object.values(error.constraints ?? {}),
                        ...collect(error.children ?? []),
                    ]);

                return new BadRequestException(collect(errors).join('; '));
            },
        })
    );

    const configService = app.get(ConfigService);

    // TRUST_PROXY приходит из env строкой, поэтому сравнивать с true напрямую
    // нельзя. В проде доверяем прокси всегда, в dev — только по явному флагу.
    const trustProxy = String(configService.get('TRUST_PROXY') ?? '').toLowerCase() === 'true';

    if (!isDev(configService) || trustProxy) {
        app.getHttpAdapter().getInstance().set('trust proxy', 1);
    }

    app.enableCors({
        origin: configService.getOrThrow('ALLOWED_ORIGIN'), // фронтенд
        credentials: true,
    });

    app.use(
        session({
            secret: configService.getOrThrow('SESSION_SECRET'),
            resave: false,
            saveUninitialized: false,
            proxy: !isDev(configService),
            store: getMongoStore(configService),
            cookie: {
                secure: !isDev(configService), // Проверяем dev или prod,
                httpOnly: true,
                sameSite: 'lax', // Всегда lax для работы с WebSocket
                maxAge: 1000 * 60 * 60 * 24, // 1 день
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const sessionSerializer = app.get(SessionSerializer);
    passport.serializeUser(sessionSerializer.serializeUser.bind(sessionSerializer));

    passport.deserializeUser(sessionSerializer.deserializeUser.bind(sessionSerializer));

    await app.listen(configService.getOrThrow('PORT'));
}

bootstrap();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import { Logger } from 'nestjs-pino';
import passport from 'passport';

import { AppModule } from './app.module';
import { SessionSerializer } from './auth/serializer/session.serializer';
import { getMongoStore } from './config/mongo-store.config';
import { isDev } from './utils/is-dev.utils';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
    });

    app.useLogger(app.get(Logger));

    const configService = app.get(ConfigService);

    if (!isDev || configService.getOrThrow('TRUST_PROXY') === true) {
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

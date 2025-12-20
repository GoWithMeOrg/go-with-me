import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { Logger } from 'nestjs-pino';
import passport from 'passport';

import { AppModule } from './app.module';
import { SessionSerializer } from './auth/serializer/session.serializer';
import { isDev } from './utils/is-dev.utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    app.setGlobalPrefix('api');

    app.getHttpAdapter().getInstance().set('trust proxy', 1);

    app.useLogger(app.get(Logger));

    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.getOrThrow('ALLOWED_ORIGIN'), // фронтенд
        credentials: true,
    });

    app.use(
        session({
            secret: configService.getOrThrow('SESSION_SECRET'),
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: configService.getOrThrow('MONGODB_URI'),
            }),
            cookie: {
                secure: !isDev(configService), // Проверяем dev или prod,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 день
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const sessionSerializer = app.get(SessionSerializer);
    passport.serializeUser(sessionSerializer.serializeUser.bind(sessionSerializer));

    passport.deserializeUser(sessionSerializer.deserializeUser.bind(sessionSerializer));

    await app.listen(process.env.PORT ?? 4000);
}

bootstrap();

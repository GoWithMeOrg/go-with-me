import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app.module';
import { SessionSerializer } from './auth/serializer/session.serializer';
import { isDev } from './utils/is-dev.utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.getOrThrow('NEXT_PUBLIC_BASE_URL'), // фронтенд
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
                secure: false, //!isDev(configService), // Проверяем dev или prod,
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

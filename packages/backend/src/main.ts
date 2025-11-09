import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { SessionSerializer } from './auth/GoogleAuth/serializer/google-session.serializer';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const allowedOrigins = configService
    .get<string>('CORS_ORIGIN', 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.use(
    session({
      secret: configService.getOrThrow('SESSION_SECRET') || 'secret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: configService.getOrThrow('MONGODB_URI'),
      }),
      cookie: {
        secure: configService.get('SESSION_COOKIE_SECURE') === 'true',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 день
        domain: configService.get('SESSION_COOKIE_DOMAIN'),
        sameSite: configService.get<'lax' | 'none' | 'strict'>('SESSION_COOKIE_SAMESITE') ?? 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const sessionSerializer = app.get(SessionSerializer);
  passport.serializeUser(sessionSerializer.serializeUser.bind(sessionSerializer));

  passport.deserializeUser(sessionSerializer.deserializeUser.bind(sessionSerializer));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();

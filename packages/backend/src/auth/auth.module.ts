import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AdminController, AuthController } from '@/auth/auth.controller.js';
import { AuthResolver } from '@/auth/auth.resolver.js';
import { AuthService } from '@/auth/auth.service.js';
import { GoogleOAuthGuard } from '@/auth/GoogleAuth/guard/google-oauth.guard.js';
import { GoogleAuthStrategy } from '@/auth/GoogleAuth/strategies/google.strategy.js';
import { SessionSerializer } from '@/auth/serializer/session.serializer.js';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard.js';
import { RoleModule } from '@/modules/role/role.module.js';
import { SessionModule } from '@/modules/session/session.module.js';
import { UserModule } from '@/modules/user/user.module.js';

@Module({
    imports: [
        ConfigModule, // чтобы использовать ConfigService в стратеги
        PassportModule.register({ session: true }), // регистрация passport
        UserModule,
        SessionModule,
        RoleModule,
    ],
    providers: [
        AuthService,
        GoogleAuthStrategy,
        SessionSerializer,
        AuthResolver,
        GoogleOAuthGuard,
        SessionAuthGuard,
    ], // регистрируем провайдеры: сервис, стратегия, сериалайзер, резолвер и guards
    controllers: [AuthController, AdminController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { UserModule } from 'src/modules/user/user.module';
import { SessionModule } from 'src/modules/session/session.module';
import { RoleModule } from 'src/modules/role/role.module';

import { GoogleAuthStrategy } from './GoogleAuth/strategies/google.strategy';

import { SessionSerializer } from './serializer/session.serializer';

import { AuthResolver } from './auth.resolver';

import { GoogleOAuthGuard } from './GoogleAuth/guard/google-oauth.guard';
import { SessionAuthGuard } from '../common/guards/session-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

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
        RolesGuard,
    ], // регистрируем провайдеры: сервис, стратегия, сериалайзер, резолвер и guards
    controllers: [AuthController], // регистрируем контроллер
})
export class AuthModule {}

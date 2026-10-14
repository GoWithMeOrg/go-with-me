import {
    Controller,
    ForbiddenException,
    Get,
    Param,
    Req,
    Res,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { Types } from 'mongoose';

import type { ReqWithPassport } from '@/common/types/graphql-context';

import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/user/entities/user.entity';

import { GoogleOAuthGuard } from './GoogleAuth/guard/google-oauth.guard';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

import { Roles } from '@/common/decorators/roles.decorator';
import { SessionService } from '@/modules/session/session.service';
import { Role } from '@/modules/role/entities/role.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
        private readonly configService: ConfigService
    ) {}

    @Get('google/login')
    @UseGuards(GoogleOAuthGuard)
    googleAuth() {
        console.log('Google OAuth login initiated');
    }

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req: ReqWithPassport, @Res() res: Response) {
        const user = req.user;

        if (!user) {
            console.error('No authenticated user after Google OAuth callback');
            return res.redirect(`${this.configService.getOrThrow('ALLOWED_ORIGIN')}/error`);
        }

        return new Promise((resolve) => {
            req.logIn(user, (err?: Error | null) => {
                if (err) {
                    console.error('req.logIn error', err);
                    return res.redirect(`${this.configService.getOrThrow('ALLOWED_ORIGIN')}/error`);
                }

                // сохраняем сессию перед редиректом (если стор предоставляет save)
                if (req.session && typeof req.session.save === 'function') {
                    req.session.save((saveErr?: Error | null) => {
                        if (saveErr) console.error('session save error', saveErr);
                        const origin = this.configService.getOrThrow('ALLOWED_ORIGIN');
                        res.redirect(`${origin}/events`);
                        return resolve(null);
                    });
                } else {
                    // если save не доступен — просто редиректим
                    const origin = this.configService.getOrThrow('ALLOWED_ORIGIN');
                    res.redirect(origin);
                    return resolve(null);
                }
            });
        });
    }

    // Публичный профиль - доступен всем авторизованным пользователям
    @Get('profile/:user_id/public')
    @UseGuards(SessionAuthGuard)
    async getPublicProfile(@Param('user_id') id: Types.ObjectId) {
        return this.userService.getPublicProfile(id);
    }

    @Get('profile/:user_id/private')
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    async getProfileById(
        @Param('user_id') id: Types.ObjectId,
        @Req() req: ReqWithPassport
    ) {
        const currentUser = req.user as User | null;

        if (!currentUser) {
            throw new ForbiddenException('No authenticated user');
        }

        // Извлекаем текстовые имена ролей для проверки
        const userRoleNames = currentUser.roles.map((role: Role) => role.name);
        const isAdmin = userRoleNames.includes('admin');

        // Сравнение ID: приводим к строке, так как из БД может прийти ObjectId
        const isOwner = String(currentUser._id) === String(id);

        // Проверяем, имеет ли пользователь доступ к этому профилю
        if (!isOwner && !isAdmin) {
            throw new ForbiddenException('Нет прав для просмотра этого профиля');
        }

        return this.userService.getUserById(id);
    }

    @Get('logout')
    logout(@Req() req: ReqWithPassport, @Res() res: Response) {
        // 1. Берем URL фронтенда
        const frontendUrl = this.configService.get('ALLOWED_ORIGIN');
        
        // Проверка на наличие ALLOWED_ORIGIN
        if (!frontendUrl) {
            console.error('ALLOWED_ORIGIN not configured, redirecting to /');
            return res.redirect('/');
        }

        req.logout((err) => {
            if (err) {
                console.error('Passport logout error:', err);
            }

            if (req.session) {
                req.session.destroy((destroyErr) => {
                    if (destroyErr) {
                        console.error('Session destroy error:', destroyErr);
                    }

                    // 2. Очищаем куку сессии явно, чтобы браузер её забыл
                    res.clearCookie('connect.sid');

                    // 3. Выполняем редирект на чистый URL фронтенда
                    return res.redirect(frontendUrl);
                });
            } else {
                return res.redirect(frontendUrl);
            }
        });
    }

    // Список сессий для текущего пользователя
    @Get('sessions')
    @UseGuards(SessionAuthGuard)
    async listSessions(@Req() req: ReqWithPassport) {
        const currentUser = req.user as User | null;
        if (!currentUser) throw new ForbiddenException('Not authenticated');
        // предпочитаем _id (ObjectId), передаём в сервис как строку (сервис принимает ObjectId|string)
        const userId = currentUser._id ?? null;
        if (!userId) throw new ForbiddenException('User ID not found');
        return this.sessionService.listSessionsForUser(String(userId));
    }

    // Удалить конкретную сессию (по sid) для текущего пользователя
    @Delete('sessions/:sid')
    @UseGuards(SessionAuthGuard)
    async deleteSession(@Param('sid') sid: string, @Req() req: ReqWithPassport) {
        const currentUser = req.user as User | null;
        if (!currentUser) throw new ForbiddenException('Not authenticated');
        const userId = currentUser._id ?? null;
        if (!userId) throw new ForbiddenException('User ID not found');
        const result = await this.sessionService.deleteSessionById(sid, String(userId));
        return result;
    }
}

@Controller('admin') // Все роуты внутри будут начинаться с /admin
@UseGuards(SessionAuthGuard, RolesGuard)
export class AdminController {
    @Get('roles')
    @Roles('admin')
    getRoles() {
        return ['admin', 'user', 'moderator'];
    }
}

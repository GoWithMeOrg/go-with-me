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
import { Schema as MongooSchema } from 'mongoose';

import type { ReqWithPassport } from 'src/common/types/graphql-context';

import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';

import { GoogleOAuthGuard } from './GoogleAuth/guard/google-oauth.guard';
import { SessionAuthGuard } from '../common/guards/session-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { Roles } from '../common/decorators/roles.decorator';
import { SessionService } from 'src/modules/session/session.service';

import { UserRole } from '../common/enums/roles.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
        private readonly configService: ConfigService
    ) {}

    @Get('google/login')
    @UseGuards(GoogleOAuthGuard)
    googleAuth() {}

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleAuthRedirect(@Req() req: ReqWithPassport, @Res() res: Response) {
        // req.user уже есть после авторизации через Google
        console.log('google callback req.user =', req.user);
        const user = req.user;

        return new Promise((resolve) => {
            req.logIn(user ?? {}, (err?: Error | null) => {
                if (err) {
                    // Ошибка при логине — направляем пользователя на страницу ошибки
                    // console.error('req.logIn error', err);
                    // res.redirect('http://localhost:3000/error');
                    return resolve(null);
                }

                // сохраняем сессию перед редиректом (если стор предоставляет save) `http://localhost:3000/events`
                if (req.session && typeof req.session.save === 'function') {
                    req.session.save((saveErr?: Error | null) => {
                        if (saveErr) console.error('session save error', saveErr);
                        console.log('session saved, session.passport =', req.session?.passport);
                        res.redirect(
                            `${this.configService.getOrThrow('ALLOWED_ORIGIN') + '/events'}`
                        );
                        return resolve(null);
                    });
                } else {
                    // если save не доступен — просто редиректим
                    console.log('session.save not available, skipping save');
                    res.redirect(this.configService.getOrThrow('ALLOWED_ORIGIN'));
                    return resolve(null);
                }
            });
        });
    }

    // Публичный профиль - доступен всем авторизованным пользователям
    @Get('profile/:user_id/public')
    @UseGuards(SessionAuthGuard)
    async getPublicProfile(@Param('id') id: MongooSchema.Types.ObjectId) {
        return this.userService.getPublicProfile(id);
    }

    @Get('profile/:user_id/private')
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles(UserRole.USER, UserRole.ADMIN)
    async getProfileById(
        @Param('id') id: MongooSchema.Types.ObjectId,
        @Req() req: ReqWithPassport
    ) {
        const currentUser = req.user as User;

        // Извлекаем текстовые имена ролей для проверки
        const userRoleNames = currentUser.roles.map((r: any) => r.role);
        const isAdmin = userRoleNames.includes(UserRole.ADMIN);

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
        // 1. Берем URL фронтенда. Добавляем запасной вариант (fallback), чтобы не было undefined
        const frontendUrl = this.configService.get('ALLOWED_ORIGIN');

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
                    res.clearCookie('connect.sid'); // Убедитесь, что имя куки совпадает с вашим (по умолчанию connect.sid)

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
        const currentUser = req.user as User | undefined | null;
        // предпочитаем _id (ObjectId), передаём в сервис как строку (сервис принимает ObjectId|string)
        const userId = currentUser?._id ?? null;
        if (!userId) return [];
        return this.sessionService.listSessionsForUser(String(userId));
    }

    // Удалить конкретную сессию (по sid) для текущего пользователя
    @Delete('sessions/:sid')
    @UseGuards(SessionAuthGuard)
    async deleteSession(@Param('sid') sid: string, @Req() req: ReqWithPassport) {
        const currentUser = req.user as User | undefined | null;
        const userId = currentUser?._id ?? null;
        if (!userId) throw new ForbiddenException('Not authenticated');
        const ok = await this.sessionService.deleteSessionById(sid, String(userId));
        return { ok };
    }
}

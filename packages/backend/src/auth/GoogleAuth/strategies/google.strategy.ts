import { ConfigService } from '@nestjs/config';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';

import { AuthService } from '@/auth/auth.service';
import { RoleService } from '@/modules/role/role.service';

import { UserService } from '@/modules/user/user.service';

import { AuthUserPayload } from '@/auth/dto/auth-user.payload';

import { GoogleProfile } from '../interfaces/profile.interface';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(GoogleStrategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        configService: ConfigService
    ) {
        super({
            clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
            scope: ['profile', 'email'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfile,
        done: VerifyCallback
    ): Promise<void> {
        const { name, emails, photos } = profile;
        
        // Валидируем данные из Google - проверяем, что обязательные поля присутствуют
        if (!name || !name.givenName || !name.familyName) {
            console.error('Invalid Google profile: missing name fields');
            return done(new Error('Invalid Google profile: missing name fields'), false);
        }

        if (!emails || emails.length === 0 || !emails[0].value) {
            console.error('Invalid Google profile: missing email');
            return done(new Error('Missing email in Google profile'), false);
        }

        // Fallback для фото профиля (Google иногда не возвращает photos)
        const photo = photos?.[0]?.value;
        const defaultPhoto = photo || 'https://via.placeholder.com/150';

        const userData = {
            firstName: name.givenName,
            lastName: name.familyName,
            image: defaultPhoto,
            email: emails[0].value,
        };

        try {
            // сохраняем или обновляем пользователя через AuthService
            const user = await this.authService.validateUser(userData);

            if (!user) {
                console.error('User not found after validation');
                return done(null, undefined);
            }

            let userRoles: Types.ObjectId[] = [];

            if (!user.roles || user.roles.length === 0) {
                const userRole = await this.roleService.getRoleByName('user');
                if (userRole && userRole._id) {
                    await this.userService.updateUserRoles(user._id, [userRole._id]);
                    userRoles.push(userRole._id);
                }
            }

            const userSaved: AuthUserPayload = {
                _id: user._id?.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: userRoles,
            };

            // передаём найденного/созданного пользователя дальше в passport
            done(null, userSaved);
        } catch (err) {
            console.error('Error in Google OAuth validate:', err);
            done(err, false);
        }
    }
}

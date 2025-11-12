import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { GoogleOAuthGuard } from '../GoogleAuth/guard/google-oauth.guard';
import { SessionAuthGuard } from '../GoogleAuth/guard/session-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
        private readonly logger = new Logger(AuthController.name);
        private readonly successRedirectUrl: string;
        private readonly failureRedirectUrl: string;
        private readonly logoutRedirectUrl: string;
        private readonly sessionCookieName: string;
        private readonly sessionCookieDomain?: string;

        constructor(private readonly configService: ConfigService) {
                const frontendBaseUrl = this.configService.get<string>('FRONTEND_BASE_URL');
                const defaultFrontendUrl = frontendBaseUrl || 'http://localhost:5173';

                this.successRedirectUrl =
                        this.configService.get<string>('AUTH_SUCCESS_REDIRECT') ||
                        `${defaultFrontendUrl}/auth/profile`;
                this.failureRedirectUrl =
                        this.configService.get<string>('AUTH_FAILURE_REDIRECT') ||
                        `${defaultFrontendUrl}/auth/profile?error=oauth`;
                this.logoutRedirectUrl =
                        this.configService.get<string>('AUTH_LOGOUT_REDIRECT') ||
                        defaultFrontendUrl;
                this.sessionCookieName =
                        this.configService.get<string>('SESSION_COOKIE_NAME') || 'connect.sid';
                this.sessionCookieDomain = this.configService.get<string>('SESSION_COOKIE_DOMAIN') || undefined;
        }

        @Get('google')
        @UseGuards(GoogleOAuthGuard)
        googleAuth() {
                // редирект на Google
        }

        @Get('google/callback')
        @UseGuards(GoogleOAuthGuard)
        async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
                // req.user уже есть после авторизации через Google
                this.logger.debug(
                        'google callback req.user = ' +
                                (req.user ? (req.user as any).email || 'present' : 'missing'),
                );

                if (!req.user) {
                        this.logger.warn('Google callback called without authenticated user');
                        return res.redirect(this.failureRedirectUrl);
                }

                try {
                        await new Promise<void>((resolve, reject) =>
                                req.logIn(req.user as any, (err) => (err ? reject(err) : resolve())),
                        );

                        await new Promise<void>((resolve, reject) =>
                                req.session.save((err: any) => (err ? reject(err) : resolve())),
                        );

                        this.logger.debug(
                                'session saved, session id = ' + (req.sessionID || 'unknown'),
                        );
                        return res.redirect(this.successRedirectUrl);
                } catch (err) {
                        this.logger.error('Failed to finish Google auth callback flow', err as Error);
                        return res.redirect(this.failureRedirectUrl);
                }
        }

        @Get('profile')
        @UseGuards(SessionAuthGuard)
        getProfile(@Req() req: Request) {
                return req.user;
        }

	// Diagnostic endpoint: returns req.user and session info (no guard)
	// @Get('session-check')
	// sessionCheck(@Req() req: Request) {
	// 	console.log('session-check - req.user =', (req as any).user);
	// 	console.log('session-check - req.sessionID =', (req as any).sessionID);
	// 	console.log(
	// 		'session-check - req.session =',
	// 		JSON.stringify((req as any).session || {}),
	// 	);
	// 	console.log(
	// 		'session-check - req.session.passport =',
	// 		(req as any).session?.passport,
	// 	);
	// 	return {
	// 		user: (req as any).user || null,
	// 		sessionID: (req as any).sessionID || null,
	// 		session: (req as any).session || null,
	// 	};
	// }

	// Diagnostic endpoint: protected by session guard
	// @Get('session-protected')
	// @UseGuards(SessionAuthGuard)
	// sessionProtected(@Req() req: Request) {
	// 	console.log('session-protected - req.user =', (req as any).user);
	// 	return { ok: true, user: (req as any).user };
	// }

        @Get('logout')
        async logout(@Req() req: Request, @Res() res: Response) {
                try {
                        await new Promise<void>((resolve, reject) =>
                                req.logOut((err) => (err ? reject(err) : resolve())),
                        );
                } catch (err) {
                        this.logger.error('Failed to log out user', err as Error);
                }

                if (req.session) {
                        try {
                                await new Promise<void>((resolve) =>
                                        req.session.destroy((destroyErr) => {
                                                if (destroyErr) {
                                                        this.logger.error('Session destroy error', destroyErr as Error);
                                                }
                                                resolve();
                                        }),
                                );
                        } catch (err) {
                                this.logger.error('Unexpected error while destroying session', err as Error);
                        }
                } else {
                        this.logger.warn('Logout requested without active session instance');
                }

                res.clearCookie(this.sessionCookieName, {
                        domain: this.sessionCookieDomain,
                        path: '/',
                });

                return res.redirect(this.logoutRedirectUrl);
        }
}

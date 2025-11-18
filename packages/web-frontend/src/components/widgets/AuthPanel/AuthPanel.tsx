'use client';

import Human from '@/assets/icons/human.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { usePopup } from '@/components/shared/Popup/hooks';
import { AuthModal } from '@/components/widgets/AuthModal';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { useSessionGQL } from '../SessionProviderGQL/SessionProvideGQLr';

import classes from './AuthPanel.module.css';

export const AuthPanel = () => {
    const { data: session, status } = useSessionGQL();
    // console.log(session?._id);

    // const user_email = session?.user?.email;
    const popupMode: 'auth' = 'auth';

    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup } = usePopup({ popupMode });

    const handleSignIn = () => {
        signIn('google');
    };

    // Нужен ли будет аргумент redirectUrl? Все редиректы будут идти с бэка относительно ролей и авторизации
    const oAuthSignIn = (provider: 'google' | 'github' | 'facebook', redirectUrl?: string) => {
        // Карта провайдеров и их URL
        const providerUrls: Record<string, string> = {
            google: process.env.NEXT_PUBLIC_AUTH_GOOGLE_URL as string,
            github: process.env.NEXT_PUBLIC_AUTH_GITHUB_URL as string,
            facebook: process.env.NEXT_PUBLIC_AUTH_FACEBOOK_URL as string,
        };

        // Получаем URL для провайдера
        let authUrl = providerUrls[provider];
        if (!authUrl) {
            console.error(
                `URL для провайдера "${provider}" не найден. Убедитесь, что переменные окружения настроены правильно.`
            );
            return;
        }
        console.log('Найден URL для провайдера:', authUrl);

        // Добавляем redirect URL если он указан. Нужно ли?
        if (redirectUrl) {
            try {
                const url = new URL(authUrl);
                url.searchParams.append('redirect', encodeURIComponent(redirectUrl));
                authUrl = url.toString();
            } catch (error) {
                console.error('Error processing redirect URL:', error);
            }
        }

        // Перенаправление
        try {
            window.location.href = authUrl;
        } catch (error) {
            console.error('Failed to redirect:', error);
            // Здесь подумать может предложить авторизоваться через другого провайдера
            // window.location.href = 'http://localhost:4000/auth/google/login';
        }
    };

    const signOut = async () => {
        try {
            await fetch('http://localhost:4000/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });
        } catch (e) {
            console.error(e);
        }
        window.location.href = 'http://localhost:3000/';
    };

    return (
        <div className={classes.component}>
            {status === 'unauthenticated' && (
                <>
                    <Button size="big" onClick={() => oAuthSignIn('google')}>
                        Войти
                    </Button>
                    <Popup showPopup={showPopup} setShowPopup={setShowPopup} popupMode={'auth'}>
                        <AuthModal onClose={handleHidePopup} onSignIn={handleSignIn} />
                    </Popup>
                </>
            )}

            {status === 'authenticated' && (
                <>
                    <div className={classes.avatarAndMenu}>
                        <div className={classes.menu}>
                            <Link
                                href={`/profile/${session?.email}/private`}
                                className={classes.linkToProfile}
                            >
                                <Human />
                            </Link>
                            <Button
                                size="big"
                                onClick={() => {
                                    confirm('Вы уверены, что хотите выйти?') && signOut();
                                }}
                            >
                                Выйти
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

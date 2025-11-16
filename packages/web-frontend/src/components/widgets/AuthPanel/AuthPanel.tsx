'use client';

// Обязательно, если используешь Next.js 13+ App Router
import React from 'react';
import Human from '@/assets/icons/human.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { usePopup } from '@/components/shared/Popup/hooks';
import { AuthModal } from '@/components/widgets/AuthModal';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import classes from './AuthPanel.module.css';

export const AuthPanel = () => {
    const { data: session, status } = useSession();

    const user_email = session?.user?.email;
    const popupMode: 'auth' = 'auth';

    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup } = usePopup({ popupMode });

    const handleSignIn = () => {
        signIn('google');
    };

    /*
     * Create form to request access token from Google's OAuth 2.0 server.
     */
    const oauthSignIn = () => {
        window.location.href = 'http://localhost:4000/auth/google/login';
    };
    //     const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    //     const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    //     const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL;

    //     if (!clientId || !redirectUri) {
    //         console.error('Google OAuth client ID or callback URL is not set');
    //         return;
    //     }

    //     const params = {
    //         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string, // Важно: должны быть публичными
    //         redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL as string,
    //         response_type: 'token', // или 'code' если используете серверный обмен
    //         scope: [
    //             'https://www.googleapis.com/auth/drive.metadata.readonly',
    //             'https://www.googleapis.com/auth/calendar.readonly',
    //         ].join(' '),
    //         include_granted_scopes: 'true',
    //         state: 'pass-through-value',
    //     };

    //     // Формируем URL с параметрами
    //     const urlParams = new URLSearchParams(params).toString();
    //     console.log(urlParams);
    //     const authUrl = `${oauth2Endpoint}?${urlParams}`;

    //     // Перенаправляем пользователя
    //     window.location.href = authUrl;
    // };

    return (
        <div className={classes.component}>
            {status === 'unauthenticated' && (
                <>
                    <Button size="big" onClick={oauthSignIn}>
                        Войти
                    </Button>

                    <Popup showPopup={showPopup} setShowPopup={setShowPopup} popupMode={'auth'}>
                        <AuthModal onClose={handleHidePopup} onSignIn={handleSignIn} />
                    </Popup>
                </>
            )}

            <>
                <div className={classes.avatarAndMenu}>
                    <div className={classes.menu}>
                        {/* <Link
                                // href={`/profile/${user_email}/private`}
                                className={classes.linkToProfile}
                            >
                                <Human />
                            </Link> */}
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
        </div>
    );
};

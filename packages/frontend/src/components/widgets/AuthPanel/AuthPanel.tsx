'use client';

import { logout, signIn } from '@/app/providers/session/actions/authActions';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import Human from '@/assets/icons/human.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { usePopup } from '@/components/shared/Popup/hooks';
import { AuthModal } from '@/components/widgets/AuthModal';
import Link from 'next/link';

import classes from './AuthPanel.module.css';

export const AuthPanel = () => {
    const { data: session, status } = useSessionGQL();

    const popupMode: 'auth' = 'auth';

    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup } = usePopup({ popupMode });

    return (
        <div className={classes.component}>
            {status === 'unauthenticated' && (
                <>
                    <Button size="big" onClick={() => signIn('google')}>
                        Войти
                    </Button>
                    <Popup showPopup={showPopup} setShowPopup={setShowPopup} popupMode={'auth'}>
                        <AuthModal onClose={handleHidePopup} onSignIn={() => signIn('google')} />
                    </Popup>
                </>
            )}

            {status === 'authenticated' && (
                <>
                    <div className={classes.avatarAndMenu}>
                        <div className={classes.menu}>
                            <Link
                                href={`/profile/${session?._id}/private`}
                                className={classes.linkToProfile}
                            >
                                <Human />
                            </Link>
                            <Button
                                size="big"
                                onClick={() => {
                                    confirm('Вы уверены, что хотите выйти?') && logout();
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

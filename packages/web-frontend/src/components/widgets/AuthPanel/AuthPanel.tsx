'use client';

import Human from '@/assets/icons/human.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { usePopup } from '@/components/shared/Popup/hooks';
import { AuthModal } from '@/components/widgets/AuthModal';
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

  return (
    <div className={classes.component}>
      {status === 'unauthenticated' && (
        <>
          <Button size="big" onClick={handleShowPopup}>
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
              <Link href={`/profile/${user_email}/private`} className={classes.linkToProfile}>
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

'use client';

import React, { useState } from 'react';
import LogoFooter from '@/assets/icons/logoFooter.svg';
import { Button } from '@/components/shared/Button';
import { Popup } from '@/components/shared/Popup';
import { usePopup } from '@/components/shared/Popup/hooks';
import { AuthModal } from '@/components/widgets/AuthModal';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import classes from './Footer.module.css';

export const Footer = () => {
  const { data: session, status } = useSession();
  const popupMode: 'auth' = 'auth';

  const { showPopup, setShowPopup, handleShowPopup, handleHidePopup } = usePopup({ popupMode });

  return (
    <footer className={classes.footer}>
      {status === 'unauthenticated' && (
        <div className={classes.footerContainer}>
          <div className={classes.footerLogIn}>
            <Button
              onClick={handleShowPopup}
              className={classes.footerLink}
              resetDefaultStyles={true}
            >
              Войти
            </Button>
            <LogoFooter />
          </div>
          <div className={classes.footerBlockLinks}>
            <div className={classes.footerBlock}>
              <Button
                onClick={handleShowPopup}
                className={classes.footerLink}
                resetDefaultStyles={true}
              >
                Events
              </Button>
              <Button
                onClick={handleShowPopup}
                className={classes.footerLink}
                resetDefaultStyles={true}
              >
                Profile
              </Button>
            </div>
            <div className={classes.footerBlock}>
              <Button
                onClick={handleShowPopup}
                className={classes.footerLink}
                resetDefaultStyles={true}
              >
                Privacy policy
              </Button>
              <Button
                onClick={handleShowPopup}
                className={classes.footerLink}
                resetDefaultStyles={true}
              >
                Terms of use
              </Button>
            </div>
            <div className={classes.footerBlock}>
              <Button
                onClick={handleShowPopup}
                className={classes.footerLink}
                resetDefaultStyles={true}
              >
                FAQ
              </Button>
              <Button
                onClick={handleShowPopup}
                className={classes.footerLink}
                resetDefaultStyles={true}
              >
                Write to use
              </Button>
            </div>

            <Popup showPopup={showPopup} setShowPopup={setShowPopup} popupMode={'auth'}>
              <AuthModal onClose={handleHidePopup} />
            </Popup>
          </div>
        </div>
      )}

      {status === 'authenticated' && (
        <div className={classes.footerContainer}>
          <div className={classes.footerLogIn}>
            <Button
              onClick={() => signOut()}
              className={classes.footerLink}
              resetDefaultStyles={true}
            >
              Выйти
            </Button>
            <Link href={'/events'}>
              <LogoFooter />
            </Link>
          </div>
          <div className={classes.footerBlockLinks}>
            <div className={classes.footerBlock}>
              <Link href="/events" className={classes.footerLink}>
                Events
              </Link>

              <Link href="/profile" className={classes.footerLink}>
                Profile
              </Link>
            </div>
            <div className={classes.footerBlock}>
              <Link href="/privacy_policy" className={classes.footerLink}>
                Privacy policy
              </Link>

              <Link href="/terms_of_use" className={classes.footerLink}>
                Terms of use
              </Link>
            </div>
            <div className={classes.footerBlock}>
              <Link href="/faq" className={classes.footerLink}>
                FAQ
              </Link>

              <Link href="/write_to_use" className={classes.footerLink}>
                Write to use
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;

import Close from '@/assets/icons/close.svg';
import Google from '@/assets/icons/google.svg';
import { Button } from '@/components/shared/Button';
import { Title } from '@/components/shared/Title';

import classes from './AuthModal.module.css';

interface IAuthModal {
  onClose?: () => void;
  onSignIn?: () => void;
}

export const AuthModal = ({ onClose, onSignIn }: IAuthModal) => {
  return (
    <div className={classes.authModal}>
      <Close className={classes.authModalClose} onClick={onClose} />
      <div className={classes.authModalWrapper}>
        <Title className={classes.authModalTitle} tag={'h3'}>
          Войдите в систему и присоединяйтесь к приключениям
        </Title>
        <p className={classes.authModalDescription}>
          войти с помощью Google {/* or social networks */}
        </p>
        <div className={classes.authModalButtons}>
          <Button className={classes.authModalButton} onClick={onSignIn}>
            <Google />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

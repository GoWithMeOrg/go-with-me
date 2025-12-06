import Arrow from '@/assets/icons/arrow.svg';
import { Button } from '@/components/shared/Button';

import { useButtonBack } from './hooks';

import classes from './ButtonBack.module.css';

export const ButtonBack = () => {
  const { handleBack } = useButtonBack();

  return (
    <Button
      resetDefaultStyles={true}
      className={`${classes.button} ${classes.next}`}
      onClick={handleBack}
    >
      <Arrow />
    </Button>
  );
};

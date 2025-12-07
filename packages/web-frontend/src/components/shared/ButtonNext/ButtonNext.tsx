import React, { FC } from 'react';
import Arrow from '@/assets/icons/arrow.svg';
import { Button } from '@/components/shared/Button';

import classes from './ButtonNext.module.css';

interface IButtonNext {
  onNext: () => void;
}

export const ButtonNext: FC<IButtonNext> = ({ onNext }) => {
  return (
    <div className={classes.control}>
      <Button
        onClick={onNext}
        resetDefaultStyles={true}
        className={`${classes.button} ${classes.next}`}
      >
        <Arrow style={{ rotate: '180deg' }} />
      </Button>
    </div>
  );
};

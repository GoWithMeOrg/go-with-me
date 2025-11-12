import { Dispatch, FC, SetStateAction } from 'react';
import Plus from '@/assets/icons/plus.svg';
import { Avatar } from '@/components/shared/Avatar';
import { Button } from '@/components/shared/Button';
import { Span } from '@/components/shared/Span';

import classes from './CardAddCompanion.module.css';

export interface CardAddCompanionProps {
  id: string;
  name: string;
  image: string;
  onClickPopupRequest: () => void;
}

export const CardAddCompanion: FC<CardAddCompanionProps> = ({
  id,
  name,
  image,
  onClickPopupRequest,
}) => {
  return (
    <div key={id}>
      <div className={classes.avatar}>
        <Avatar name={name} image={image} scale={1.8} id={id} />

        <Plus className={classes.addCompanion} onClick={onClickPopupRequest} />
      </div>

      <Span title={name.split(' ')[0]} className={classes.name} />
      <Span title={name.split(' ')[1]} className={classes.name} />
    </div>
  );
};

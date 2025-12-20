import { FC } from 'react';
import { Title } from '@/components/shared/Title';

import classes from './CardWork.module.css';

interface CardWorkProps {
  title: string;
  description: React.ReactNode;
  picture: React.ReactNode;
}

export const CardWork: FC<CardWorkProps> = ({ title, description, picture }) => {
  return (
    <div className={classes.cardWork}>
      <div className={classes.cardWorkWrapper}>
        <Title title={title} className={classes.cardWorkTitle} tag={'h3'} />
        <div className={classes.cardWorkDescription}>{description}</div>
        <div className={classes.cardWorkPicture}>{picture}</div>
      </div>
    </div>
  );
};

export default CardWork;

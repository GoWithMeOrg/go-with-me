import { FC } from 'react';
import { Title } from '@/components/shared/Title';

import classes from './CardWork.module.css';

interface CardWorkProps {
    title: string;
    description: string;
    picture: React.ReactNode;
}

export const CardWork: FC<CardWorkProps> = ({ title, description, picture }) => {
    return (
        <div className={classes.cardWork}>
            <div className={classes.cardWorkWrapper}>
                <Title title={title} className={classes.cardWorkTitle} tag="h3" />
                <p className={classes.cardWorkDescription}>{description}</p>
                <div className={classes.cardWorkPicture}>{picture}</div>
            </div>
        </div>
    );
};

export default CardWork;

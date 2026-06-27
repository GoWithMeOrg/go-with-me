import Clock from '@/assets/icons/clock.svg';
import dayjs from 'dayjs';

import { DateTimeProps } from './types';

import classes from './DateTime.module.css';

export const DateTime = ({ startDate, time }: DateTimeProps) => (
    <div className={classes.wrapper}>
        <Clock className={classes.icon} />
        {startDate && <time className={classes.date}>{dayjs(startDate).format('DD.MM.YYYY')}</time>}
        {time && <span className={classes.time}>{time}</span>}
    </div>
);

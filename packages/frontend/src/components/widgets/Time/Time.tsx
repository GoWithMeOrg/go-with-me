import { FC, forwardRef } from 'react';
import dayjs from 'dayjs';

import classes from './Time.module.css';

interface ITime {
    time?: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Time: FC<ITime> = ({ time, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <label className={classes.time}>
            <span className={classes.timeTitle}>Время начала</span>
            <input
                type="time"
                name="time"
                defaultValue={(time || dayjs().format('HH:mm')) as string}
                className={classes.timeInput}
                onChange={handleChange}
            />
        </label>
    );
};

export default Time;

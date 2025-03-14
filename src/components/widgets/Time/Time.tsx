import { forwardRef } from "react";

import dayjs from "dayjs";

import classes from "./Time.module.css";
interface ITime {
    time?: Date | string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Time = forwardRef(function Time(props: ITime, ref) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
    };

    return (
        <label className={classes.time}>
            <span className={classes.timeTitle}>Время начала</span>
            <input
                type="time"
                name="time"
                defaultValue={(props.time || dayjs().format("HH:mm")) as string}
                className={classes.timeInput}
                onChange={handleChange}
            />
        </label>
    );
});

export default Time;

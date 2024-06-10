import dayjs from "dayjs";
import classes from "./Time.module.css";
import { forwardRef } from "react";

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
            <span className={classes.timeTitle}>Start time</span>
            <input
                type="time"
                name="time"
                defaultValue={dayjs(props.time).format("YYYY-MM-DD")}
                className={classes.timeInput}
                onChange={handleChange}
            />
        </label>
    );
});

export default Time;

import dayjs from "dayjs";
import classes from "./Time.module.css";
import { useState } from "react";

interface ITime {
    time?: string;
    onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Time = ({ time, onTimeChange }: ITime) => {
    const [startTime, setStartTime] = useState<string>(time ?? "00:00");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
        if (onTimeChange) {
            const changeEvent = Object.assign(Object.create(e), {
                target: {
                    value: e.target.value,
                },
            });
            onTimeChange(changeEvent);
        }
    };

    return (
        <label className={classes.time}>
            <span className={classes.timeTitle}>Start time</span>
            <input
                type="time"
                name="time"
                defaultValue={time ?? dayjs(startTime).format("HH:mm")}
                className={classes.timeInput}
                onChange={handleChange}
            />
        </label>
    );
};

export default Time;

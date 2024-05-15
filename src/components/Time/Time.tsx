import dayjs from "dayjs";
import classes from "./Time.module.css";
import { Input } from "../Input";
import { useState } from "react";

interface ITime {
    time?: string;
}
export const Time = ({ time }: ITime) => {
    const [startTime, setStartTime] = useState<string>(time ?? "00:00");

    return (
        <label className={classes.time}>
            <span className={classes.timeTitle}>Start time</span>
            <Input
                type="time"
                name="time"
                defaultValue={time ?? dayjs(startTime).format("HH:mm")}
                className={classes.timeInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
            />
        </label>
    );
};

export default Time;

import { forwardRef } from "react";
import dayjs from "dayjs";

import classes from "./Date.module.css";
export interface IDate {
    date?: Date | string | undefined;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Date = forwardRef(function Date(props: IDate, ref) {
    return (
        <label className={classes.date}>
            <span className={classes.dateTitle}>{props.title}</span>
            <input
                type="date"
                name={props.title}
                defaultValue={dayjs(props.date).format("YYYY-MM-DD")}
                className={classes.dateInput}
                onChange={(e) => props.onChange(e)}
            />
        </label>
    );
});

export default Date;

import dayjs from "dayjs";
import classes from "./Date.module.css";
import { forwardRef } from "react";

export interface IDate {
    date?: Date | string | undefined;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Date = forwardRef(function Date(props: IDate, ref) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
    };

    return (
        <label className={classes.date}>
            <span className={classes.dateTitle}>{props.title}</span>
            <input
                type="date"
                name={props.title}
                defaultValue={dayjs(props.date).format("YYYY-MM-DD")}
                className={classes.dateInput}
                onChange={handleChange}
            />
        </label>
    );
});

export default Date;

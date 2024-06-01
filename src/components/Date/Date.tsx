import dayjs from "dayjs";
import classes from "./Date.module.css";
import { useState } from "react";

export interface IDate {
    date: Date | string | undefined;
    title: string;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Date = ({ date, title, onDateChange }: IDate) => {
    const [isDate, setIsDate] = useState(date ?? "");
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     onChange(e);
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDate(e.target.value);
        if (onDateChange) {
            const changeEvent = Object.assign(Object.create(e), {
                target: {
                    value: e.target.value,
                },
            });
            onDateChange(changeEvent);
        }
    };

    return (
        <label className={classes.date}>
            <span className={classes.dateTitle}>{title}</span>
            <input
                type="date"
                name={title}
                defaultValue={dayjs(isDate).format("YYYY-MM-DD")}
                className={classes.dateInput}
                onChange={handleChange}
            />
        </label>
    );
};

export default Date;

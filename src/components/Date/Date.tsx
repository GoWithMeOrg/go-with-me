import dayjs from "dayjs";
import classes from "./Date.module.css";
import { Input } from "../Input";

export interface IDate {
    date: Date | string | undefined;
    title: string;
}
export const Date = ({ date, title }: IDate) => {
    return (
        <label className={classes.date}>
            <span className={classes.dateTitle}>{title}</span>
            <Input
                type="date"
                name={title}
                defaultValue={dayjs(date).format("YYYY-MM-DD")}
                className={classes.dateInput}
            />
        </label>
    );
};

export default Date;

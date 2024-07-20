import { forwardRef } from "react";
import classes from "./TitleField.module.css";

interface TitleFieldProps {
    title: string;
    defaultValue?: string;
    onChange?: (...event: any[]) => void;
}

export const TitleField = forwardRef(function TitleField(props: TitleFieldProps, ref) {
    return (
        <label className={classes.titleForm}>
            <span className={classes.titleInput}>{props.title}</span>
            <input className={classes.fieldInput} defaultValue={props.defaultValue} onChange={props.onChange} />
        </label>
    );
});

export default TitleField;

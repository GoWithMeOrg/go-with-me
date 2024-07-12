import { forwardRef } from "react";
import classes from "./TitleField.module.css";

interface TitleFieldProps {
    title: string;
}

export const TitleField = forwardRef(function TitleField(props: TitleFieldProps, ref) {
    return (
        <label className={classes.titleForm}>
            <span className={classes.titleInput}>{props.title}</span>
            <input {...props} className={classes.fieldInput} />
        </label>
    );
});

export default TitleField;

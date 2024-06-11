import { forwardRef } from "react";
import classes from "./TitleField.module.css";
import { RefCallBack } from "react-hook-form";

interface ITitleField {
    name: string;
    ref: RefCallBack;
}

export const TitleField = forwardRef(function TitleField(props, ref) {
    return (
        <label className={classes.titleForm}>
            <span className={classes.titleInput}>Event title</span>
            <input {...props} className={classes.fieldInput} />
        </label>
    );
});

export default TitleField;

import { forwardRef } from "react";
import classes from "./TitleField.module.css";
import { Input } from "../Input";

export const TitleField = forwardRef(function TitleField(props, ref) {
    return (
        <label>
            <span className={classes.titleInput}>Event title</span>
            <Input {...props} />
        </label>
    );
});

export default TitleField;

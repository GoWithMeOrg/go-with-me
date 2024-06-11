import { forwardRef } from "react";
import classes from "./Description.module.css";

interface IDescription {
    text: string | undefined;
    onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Description = forwardRef(function Description(props, ref) {
    return (
        <label className={classes.descriptionLabel}>
            <span className={classes.descriptionTitle}>Description</span>
            <textarea rows={8} name="description" className={classes.descriptionText} {...props} />
        </label>
    );
});

export default Description;

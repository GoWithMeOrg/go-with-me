import { forwardRef } from "react";
import classes from "./Description.module.css";

interface IDescriptionProps {
    title: string;
}

export const Description = forwardRef(function Description(props: IDescriptionProps, ref) {
    return (
        <label className={classes.descriptionLabel}>
            <span className={classes.descriptionTitle}>{props.title}</span>
            <textarea rows={8} name="description" className={classes.descriptionText} {...props} />
        </label>
    );
});

export default Description;

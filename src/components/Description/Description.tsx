import { forwardRef } from "react";
import classes from "./Description.module.css";

interface IDescriptionProps {
    title: string;
    defaultValue?: string;
    onChange?: (...event: any[]) => void;
}

export const Description = forwardRef(function Description(props: IDescriptionProps, ref) {
    return (
        <label className={classes.descriptionLabel}>
            <span className={classes.descriptionTitle}>{props.title}</span>
            <textarea
                rows={8}
                name="description"
                className={classes.descriptionText}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
            />
        </label>
    );
});

export default Description;

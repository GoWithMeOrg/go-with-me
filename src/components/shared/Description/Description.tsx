import { forwardRef } from "react";
import classes from "./Description.module.css";
import { Textarea } from "../Textarea";

interface IDescriptionProps {
    title: string;
    defaultValue?: string;
    onChange?: (...event: any[]) => void;
}

export const Description = forwardRef(function Description(props: IDescriptionProps, ref) {
    return (
        <label className={classes.descriptionLabel}>
            <span className={classes.descriptionTitle}>Description</span>
            <Textarea
                {...{
                    rows: 6,
                    resizeNone: true,
                }}
                {...{ ref, ...props }}
            ></Textarea>
        </label>
    );
});

export default Description;

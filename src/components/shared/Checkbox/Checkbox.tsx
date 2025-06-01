import { FC } from "react";
import classes from "./Checkbox.module.css";

interface CheckboxProps {
    className: string;
}

export const Checkbox: FC<CheckboxProps> = ({ className }) => {
    const labelCss = [classes.checkbox, className].filter(Boolean).join(" ");

    return (
        <label className={labelCss}>
            <input type="checkbox" />
        </label>
    );
};

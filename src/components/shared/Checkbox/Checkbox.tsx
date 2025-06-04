import { FC } from "react";
import { useCheckbox } from "./hooks";
import classes from "./Checkbox.module.css";

export interface CheckboxProps {
    className?: string;
    onChange: (checked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ className, onChange }) => {
    const labelCss = [classes.checkbox, className].filter(Boolean).join(" ");
    const { checked, handleInputChange } = useCheckbox({ onChange });

    return (
        <label className={labelCss}>
            <input type="checkbox" checked={checked} onChange={handleInputChange} />
        </label>
    );
};

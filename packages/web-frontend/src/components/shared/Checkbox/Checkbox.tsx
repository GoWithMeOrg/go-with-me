import React, { FC } from "react";

import { useCheckbox } from "./hooks";

import classes from "./Checkbox.module.css";

export interface CheckboxProps {
    className?: string;
    onChange: (checked: boolean) => void;
    id: string;
    checked?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ className, onChange, id, checked: controlledChecked }) => {
    const labelCss = [classes.checkbox, className].filter(Boolean).join(" ");
    const { checked, setChecked, handleInputChange } = useCheckbox({ onChange, controlledChecked });

    return (
        <label className={labelCss} id={id}>
            <input type="checkbox" checked={controlledChecked !== undefined ? controlledChecked : checked} onChange={handleInputChange} />
        </label>
    );
};

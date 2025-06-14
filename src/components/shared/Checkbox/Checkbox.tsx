import React, { FC } from "react";

import { useCheckbox } from "./hooks";

import classes from "./Checkbox.module.css";

export interface CheckboxProps {
    className?: string;
    onChange: (checked: boolean) => void;
    id: string;
}

export const Checkbox: FC<CheckboxProps> = ({ className, onChange, id }) => {
    const labelCss = [classes.checkbox, className].filter(Boolean).join(" ");
    const { checked, handleInputChange } = useCheckbox({ onChange });

    return (
        <label className={labelCss} id={id}>
            <input type="checkbox" checked={checked} onChange={handleInputChange} />
        </label>
    );
};

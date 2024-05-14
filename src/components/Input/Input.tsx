import React, { forwardRef } from "react";

interface Props {
    id?: string;
    type: string;
    placeholder?: string;
    className?: string;
    value?: string;
    defaultChecked?: boolean;
    name?: string;
    onClick?: () => void;
    checked?: boolean;
    defaultValue?: string;
    required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return (
        <input
            ref={ref}
            type={props.type}
            placeholder={props.placeholder}
            className={props.className}
            value={props.value}
            defaultChecked={props.defaultChecked}
            name={props.name}
            onClick={props.onClick}
            defaultValue={props.defaultValue}
            required={props.required}
        />
    );
});

Input.displayName = "Input";

export default Input;

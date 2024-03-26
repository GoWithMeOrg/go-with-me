import React, { forwardRef } from "react";

interface Props {
    type: string;
    placeholder: string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <input ref={ref} type={props.type} placeholder={props.placeholder} className={props.className} />;
});

Input.displayName = "Input";

export default Input;

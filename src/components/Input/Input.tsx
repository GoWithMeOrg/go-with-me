import React, { forwardRef } from "react";

interface Props {
    type: string;
    placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return <input ref={ref} type={props.type} placeholder={props.placeholder} />;
});

Input.displayName = "Input";

export default Input;

import {
    FC,
    useMemo,
    InputHTMLAttributes,
    RefObject,
    RefAttributes,
    ChangeEvent,
    useState,
    ChangeEventHandler,
} from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    resetDefaultStyles?: boolean;
    error?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ resetDefaultStyles, className, error, onChange, ...rest }) => {
    const inputCssString: string = useMemo(() => {
        let cssString = "";
        if (!resetDefaultStyles) cssString += styles.input;
        if (className) cssString += " " + className;
        return cssString;
    }, [resetDefaultStyles, className]);

    return <input className={inputCssString} {...rest} onChange={onChange} />;
};

Input.displayName = "Input";

export default Input;

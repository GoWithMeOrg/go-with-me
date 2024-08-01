import { FC, useMemo, forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    resetDefaultStyles?: boolean;
    error?: boolean;
}

export const Input: FC<InputProps> = ({ resetDefaultStyles, className, error, ...rest }) => {
    const inputCssString: string = useMemo(() => {
        let cssString = "";
        if (!resetDefaultStyles) cssString += styles.input;
        if (className) cssString += " " + className;
        return cssString;
    }, [resetDefaultStyles, className]);

    return <input className={inputCssString} {...{ ...rest }} />;
};

Input.displayName = "Input";

export default Input;

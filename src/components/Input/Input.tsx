import { FC, useMemo, forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    resetDefaultStyles?: boolean;
    resizeNone?: boolean;
    error?: boolean;
}

export const Input: FC<InputProps> = forwardRef(({ resetDefaultStyles, className, resizeNone, error, ...rest }) => {
    const inputCssString: string = useMemo(() => {
        let cssString = "";
        if (!resetDefaultStyles) cssString += styles.input;
        if (className) cssString += " " + className;
        if (resizeNone) cssString += " " + styles.resizeNone;
        if (error) cssString += " " + styles.error;
        return cssString;
    }, [resetDefaultStyles, className, resizeNone, error]);

    return <input className={inputCssString} {...{ ...rest }} />;
});

Input.displayName = "Input";

export default Input;

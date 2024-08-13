import { FC, TextareaHTMLAttributes, useMemo } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    resetDefaultStyles?: boolean;
    resizeNone?: boolean;
    error?: boolean;
}

export const Textarea: FC<TextareaProps> = ({ resetDefaultStyles, className, resizeNone, error, ...rest }) => {
    const textareaCssString: string = useMemo(() => {
        let cssString = "";
        if (!resetDefaultStyles) cssString += styles.textarea;
        if (className) cssString += " " + className;
        if (resizeNone) cssString += " " + styles.resizeNone;
        if (error) cssString += " " + styles.error;
        return cssString;
    }, [resetDefaultStyles, className, resizeNone, error]);

    return <textarea className={textareaCssString} {...{ ...rest }} />;
};

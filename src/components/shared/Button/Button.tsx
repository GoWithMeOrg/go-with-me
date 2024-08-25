import { ButtonHTMLAttributes, FC, useMemo } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    resetDefaultStyles?: boolean;
    size?: "normal" | "big";
}

export const Button: FC<ButtonProps> = ({ label, children, className, resetDefaultStyles, size, ...rest }) => {
    const buttonCssString: string = useMemo(() => {
        let cssString = "";
        if (!resetDefaultStyles) cssString += styles.button;
        if (size) {
            if (size === "big") cssString += " " + styles.big;
        }
        if (className) cssString += " " + className;
        return cssString;
    }, [resetDefaultStyles, className, size]);

    return (
        <button className={buttonCssString} {...rest}>
            {children}
            {label}
        </button>
    );
};

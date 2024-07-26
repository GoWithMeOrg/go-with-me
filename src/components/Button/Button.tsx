import { ButtonHTMLAttributes, FC, useMemo } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: React.ReactNode;
    resetDefaultStyles?: boolean;
    size?: "normal" | "big";
}

export const Button: FC<ButtonProps> = ({ text, icon, children, className, resetDefaultStyles, size, ...rest }) => {
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
        <button className={buttonCssString} {...{ ...rest }}>
            {icon}
            {children}
            {text}
        </button>
    );
};

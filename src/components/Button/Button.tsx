import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ text, icon, children, className, ...rest }) => {
    return (
        <button className={`${styles.button} ${className ?? ""}`} {...{ ...rest }}>
            {icon}
            {children}
            {text}
        </button>
    );
};

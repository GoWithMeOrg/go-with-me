import { ButtonHTMLAttributes, FC, useMemo } from "react";

import classes from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    resetDefaultStyles?: boolean;
    size?: "normal" | "big";
    stretch?: boolean;
}

export const Button: FC<ButtonProps> = ({ stretch, children, className, resetDefaultStyles, size, ...rest }) => {
    const buttonCssString = useMemo(
        () =>
            [
                !resetDefaultStyles && classes.button,
                size === "big" && classes.big,
                stretch && classes.stretch,
                className,
            ]
                .filter(Boolean)
                .join(" "),
        [resetDefaultStyles, className, size, stretch],
    );

    return (
        <button className={buttonCssString} {...rest}>
            {children}
        </button>
    );
};

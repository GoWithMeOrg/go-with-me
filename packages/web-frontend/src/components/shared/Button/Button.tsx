"use client";

import { ButtonHTMLAttributes, FC, useMemo } from "react";

import classes from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    resetDefaultStyles?: boolean;
    size?: "normal" | "big";
    stretch?: boolean;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
    stretch,
    children,
    className,
    resetDefaultStyles,
    size,
    disabled,
    ...rest
}) => {
    const buttonCssString = [
        !resetDefaultStyles && classes.button,
        size === "big" && classes.big,
        stretch && classes.stretch,
        disabled && classes.disabled,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={buttonCssString} {...rest} disabled={disabled}>
            {children}
        </button>
    );
};

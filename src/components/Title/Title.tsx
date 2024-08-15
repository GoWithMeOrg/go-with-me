import { createElement, FC, HTMLProps, useMemo } from "react";
import styles from "./Title.module.css";

interface TitleProps extends HTMLProps<HTMLHeadingElement> {
    title?: string;
    tag: "h1" | "h2" | "h3";
}

export const Title: FC<TitleProps> = ({ className, title, tag, children, ...rest }) => {
    const headingCssString: string = useMemo(() => {
        let cssString = styles[tag];
        if (className) cssString += " " + className;
        return cssString;
    }, [className, tag]);

    return createElement(tag, { className: headingCssString, ...rest }, title ?? children);
};

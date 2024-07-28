import { FC, Fragment, HTMLProps, useMemo } from "react";
import styles from "./Title.module.css";

interface TitleProps extends HTMLProps<HTMLHeadingElement> {
    title: string;
    tag?: "h1" | "h2" | "h3";
}

export const Title: FC<TitleProps> = ({ className, title, tag, ...rest }) => {
    const hCssString: string = useMemo(() => {
        let cssString = "";
        if (tag === "h1") cssString += styles.h1;
        if (tag === "h2") cssString += styles.h2;
        if (tag === "h3") cssString += styles.h3;

        if (className) cssString += " " + className;
        return cssString;
    }, [className, tag]);

    return (
        <Fragment>
            {tag === "h1" && (
                <h1 className={hCssString} {...rest}>
                    {title}
                </h1>
            )}

            {tag === "h2" && (
                <h2 className={hCssString} {...rest}>
                    {title}
                </h2>
            )}

            {tag === "h3" && (
                <h3 className={hCssString} {...rest}>
                    {title}
                </h3>
            )}
        </Fragment>
    );
};

export default Title;

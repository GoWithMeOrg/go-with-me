import React, { FC, useMemo } from "react";
import styles from "./Container.module.css";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export const Container: FC<ContainerProps> = ({ children, className, ...rest }) => {
    const containerCssString: string = useMemo(() => {
        let cssString = "";
        cssString += styles.container;
        if (className) cssString += " " + className;
        return cssString;
    }, [className]);

    return (
        <main className={containerCssString} {...{ ...rest }}>
            <div className={styles.containerWidth}>{children}</div>
        </main>
    );
};

export default Container;

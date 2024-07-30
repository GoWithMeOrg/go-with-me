import React from "react";
import classes from "./Container.module.css";

type Props = {
    children?: React.ReactNode;
};
export const Container = ({ children }: Props) => {
    return <main className={classes.container}>{children}</main>;
};

export default Container;

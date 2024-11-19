import Link from "next/link";
import React, { FC, useMemo } from "react";

import ArrowCircle from "@/assets/icons/arrowCircle.svg";

import classes from "./MoreLink.module.css";

export interface MoreLinkProps {
    link: string;
    text: string;
    size?: "big" | "normal";
}

export const MoreLink: FC<MoreLinkProps> = ({ link, text, size, ...rest }) => {
    const moreLinkCssString = useMemo(
        () => [classes.moreText, size === "big" && classes.moreTextBig].filter(Boolean).join(" "),
        [size],
    );

    return (
        <Link href={link} className={classes.moreLink} {...rest}>
            <span className={moreLinkCssString}>{text}</span>
            <ArrowCircle />
        </Link>
    );
};

export default MoreLink;

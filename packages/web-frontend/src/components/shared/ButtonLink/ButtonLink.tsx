import Link from "next/link";
import classes from "./ButtonLink.module.css";
import { FC } from "react";

interface ButtonLinkProps {
    href: string;
    text: string;
    width: string;
    className?: string;
}
export const ButtonLink: FC<ButtonLinkProps> = ({ href, text, width, className }) => {
    const linkCss = [classes.link, className].filter(Boolean).join(" ");

    return (
        <Link className={linkCss} href={href} style={{ width }}>
            {text}
        </Link>
    );
};

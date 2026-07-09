import React, { FC } from 'react';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import Link from 'next/link';

import classes from './MoreLink.module.css';

export interface MoreLinkProps {
    link: string;
    text: string;
    size?: 'big' | 'normal';
}

export const MoreLink: FC<MoreLinkProps> = ({ link, text, size, ...rest }) => {
    const moreLinkCss = [classes.moreText, size === 'big' && classes.moreTextBig]
        .filter(Boolean)
        .join(' ');

    return (
        <Link href={link} className={classes.moreLink} {...rest}>
            <span className={moreLinkCss}>{text}</span>
            <ArrowCircle className={classes.moreArrow} />
        </Link>
    );
};

export default MoreLink;

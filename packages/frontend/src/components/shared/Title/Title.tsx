import { createElement, FC, HTMLProps } from 'react';

import styles from './Title.module.css';

interface TitleProps extends HTMLProps<HTMLHeadingElement> {
    title?: string;
    tag: 'h1' | 'h2' | 'h3';
}

export const Title: FC<TitleProps> = ({ className, title, children, tag, ...rest }) => {
    const titleClassName = [styles[tag], className].filter(Boolean).join(' ');

    return createElement(tag, { className: titleClassName, ...rest }, title ?? children);
};

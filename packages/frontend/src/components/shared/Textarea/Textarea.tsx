import { FC, TextareaHTMLAttributes, useMemo } from 'react';

import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    resetDefaultStyles?: boolean;
    resizeNone?: boolean;
    error?: boolean;
}

export const Textarea: FC<TextareaProps> = ({
    resetDefaultStyles,
    className,
    resizeNone,
    error,
    rows = 6,
    ...rest
}) => {
    const textareaCssString = [
        !resetDefaultStyles && styles.textarea,
        className,
        resizeNone && styles.resizeNone,
        error && styles.error,
    ]
        .filter(Boolean)
        .join(' ');

    return <textarea className={textareaCssString} rows={rows} {...rest} />;
};

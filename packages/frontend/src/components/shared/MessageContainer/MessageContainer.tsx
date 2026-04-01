import { FC, HTMLAttributes } from 'react';

import classes from '@/components/shared/MessageContainer/MessageContainer.module.css';

export const MessageContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...rest
}) => (
    <section className={classes.container}>
        <div className={`${classes.messageContainer} ${className ?? ''}`} {...rest}>
            {children}
        </div>
    </section>
);

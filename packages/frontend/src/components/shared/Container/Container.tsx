import { FC, HTMLAttributes } from 'react';

import styles from './Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}
export const Container: FC<ContainerProps> = ({ children, className, ...rest }) => (
    <main className={`${styles.container}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
    </main>
);

export default Container;

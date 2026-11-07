import { FC, forwardRef, HTMLProps, Ref, useMemo } from 'react';

import classes from './Label.module.css';

interface LabelProps extends HTMLProps<HTMLLabelElement> {
    label: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLLabelElement>) => void;
    children?: React.ReactNode;
    ref?: Ref<HTMLLabelElement>;
    className?: string;
    htmlFor?: string;
}

export const Label: FC<LabelProps> = forwardRef(function LabelProps(props: LabelProps, ref) {
    const labelCssString: string = useMemo(() => {
        let cssString = '';
        cssString += classes.label;
        if (props.className) cssString += ' ' + props.className;
        return cssString;
    }, [props.className]);

    return (
        <label ref={ref} className={labelCssString} htmlFor={props.htmlFor}>
            {props.label}
            {props.children}
        </label>
    );
});

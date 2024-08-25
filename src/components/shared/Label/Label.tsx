import { FC, forwardRef, HTMLProps, Ref, useMemo } from "react";

import classes from "./Label.module.css";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
    label: string;
    defaultValue?: string;
    onChange?: (...event: any[]) => void;
    children?: React.ReactNode;
    ref?: Ref<HTMLLabelElement>;
    className?: string;
}

export const Label: FC<LabelProps> = forwardRef(function LabelProps(props: LabelProps, ref) {
    const labelCssString: string = useMemo(() => {
        let cssString = "";
        cssString += classes.label;
        if (props.className) cssString += " " + props.className;
        return cssString;
    }, [props.className]);

    return (
        <label className={labelCssString}>
            {props.label}
            {props.children}
        </label>
    );
});

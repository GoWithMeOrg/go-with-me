import { forwardRef } from "react";
import classes from "./TitleField.module.css";
import { Input } from "../Input";
import { Span } from "../Span";

interface TitleFieldProps {
    title: string;
    defaultValue?: string;
    onChange?: (...event: any[]) => void;
}

export const TitleField = forwardRef(function TitleField(props: TitleFieldProps, ref) {
    return (
        <label>
            <Span title={props.title} />
            <Input {...props} defaultValue={props.defaultValue} />
        </label>
    );
});

export default TitleField;

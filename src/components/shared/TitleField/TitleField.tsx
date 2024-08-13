import { forwardRef } from "react";

import { Span } from "@/components/Span";
import { Input } from "@/components/shared/Input";

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

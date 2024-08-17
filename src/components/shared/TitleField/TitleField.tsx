import { forwardRef } from "react";

import { Input } from "@/components/shared/Input";

import classes from "./TitleField.module.css";
interface TitleFieldProps {
    title: string;
    defaultValue?: string;
    onChange?: (...event: any[]) => void;
}

export const TitleField = forwardRef(function TitleField(props: TitleFieldProps, ref) {
    return (
        <label>
            <span className={classes.titleInput}>Event title</span>
            <Input {...props} />
        </label>
    );
});

export default TitleField;

import { useState } from "react";
import classes from "./TitleField.module.css";

interface ITitleField {
    defaultValue: string | undefined;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleField = ({ defaultValue, onTitleChange }: ITitleField) => {
    const [eventName, setEventName] = useState(defaultValue ?? "");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value);
        if (onTitleChange) {
            const changeEvent = Object.assign(Object.create(e), {
                target: {
                    value: e.target.value,
                },
            });
            onTitleChange(changeEvent);
        }
    };

    return (
        <label className={classes.titleForm}>
            <span className={classes.titleInput}>Event title</span>
            <input
                className={classes.fieldInput}
                type="text"
                name="name"
                defaultValue={eventName}
                onChange={handleChange}
                required
            />
        </label>
    );
};

export default TitleField;

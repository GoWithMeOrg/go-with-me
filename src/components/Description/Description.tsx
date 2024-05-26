import { useState } from "react";
import classes from "./Description.module.css";

interface IDescription {
    text: string | undefined;
    onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Description = ({ text, onDescriptionChange }: IDescription) => {
    const [description, setDescription] = useState(text ?? "");
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        if (onDescriptionChange) {
            const changeEvent = Object.assign(Object.create(e), {
                target: {
                    value: e.target.value,
                },
            });
            onDescriptionChange(changeEvent);
        }
    };

    return (
        <label className={classes.descriptionLabel}>
            <span className={classes.descriptionTitle}>Description</span>
            <textarea
                rows={8}
                name="description"
                defaultValue={description}
                className={classes.descriptionText}
                onChange={handleChange}
            />
        </label>
    );
};

export default Description;

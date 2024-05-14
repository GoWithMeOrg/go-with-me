import { Input } from "../Input";
import classes from "./TitleField.module.css";

interface ITitleField {
    name: string | undefined;
}

export const TitleField = ({ name }: ITitleField) => {
    return (
        <label className={classes.titleForm}>
            <span className={classes.titleInput}>Event title</span>
            <Input className={classes.fieldInput} type="text" name="name" defaultValue={name} required />
        </label>
    );
};

export default TitleField;

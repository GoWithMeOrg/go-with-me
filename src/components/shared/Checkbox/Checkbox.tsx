import classes from "./Checkbox.module.css";
export const Checkbox = () => {
    return (
        <label className={classes.checkbox}>
            <input type="checkbox" />
        </label>
    );
};

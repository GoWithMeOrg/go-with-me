import classes from "./Description.module.css";

interface IDescription {
    text: string | undefined;
}

export const Description = ({ text }: IDescription) => {
    return (
        <label className={classes.descriptionLabel}>
            <span className={classes.descriptionTitle}>Description</span>
            <textarea rows={8} name="description" defaultValue={text} className={classes.descriptionText} />
        </label>
    );
};

export default Description;

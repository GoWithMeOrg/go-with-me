import classes from "./CardWork.module.css";
interface CardWorkProps {
    title: string;
    description: React.ReactNode;
    picture: React.ReactNode;
}

export const CardWork = ({ title, description, picture }: CardWorkProps) => {
    return (
        <div className={classes.cardWork}>
            <div className={classes.cardWorkWrapper}>
                <div className={classes.cardWorkTitle}>
                    <h3>{title}</h3>
                </div>
                <div className={classes.cardWorkDescription}>{description}</div>
                <div className={classes.cardWorkPicture}>{picture}</div>
            </div>
        </div>
    );
};

export default CardWork;

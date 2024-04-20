import classes from "./CreateAndInvite.module.css";
import Join from "@/assets/icons/join.svg";

export const CreateAndInvite = () => {
    return (
        <div className={classes.createAndInvite}>
            <div className={classes.logoJoin}>
                <Join />
            </div>
            <div className={classes.createAndInviteWrapper}>
                <div className={classes.createAndInviteTitle}>
                    <h2>CREATE AND INVITE</h2>
                </div>
                <div className={classes.createAndInviteButtons}>
                    <button className={classes.createAndInviteButton}>Create event</button>
                    <button className={classes.createAndInviteButton}>Create trip</button>
                </div>
            </div>
            <div className={classes.createAndInviteDescr}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim!
                </p>
            </div>
        </div>
    );
};

export default CreateAndInvite;

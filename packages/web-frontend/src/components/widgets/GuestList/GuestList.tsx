import { Button } from "@/components/shared/Button";
import Arrow from "@/assets/icons/arrow.svg";

import classes from "./GuestList.module.css";

export const GuestList = () => {
    return (
        <div className={classes.guestList}>
            <span className={classes.guestListTitle}>Guest list</span>
            <div className={classes.guestListWrapper}></div>
            <Button className={classes.questListArrow} resetDefaultStyles={true}>
                <Arrow
                //style={{ transform: "rotate(180deg)" }}
                />
            </Button>
        </div>
    );
};

export default GuestList;

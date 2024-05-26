import { CardUser } from "../CardUser";
import Arrow from "@/assets/icons/arrow.svg";
import classes from "./GuestList.module.css";
import { Button } from "../Button";

export const GuestList = () => {
    return (
        <div className={classes.guestList}>
            <span className={classes.guestListTitle}>Guest list</span>
            <div className={classes.guestListWrapper}>
                <CardUser width={100} userName="Mike Scoones" status={"joined"} />
                <CardUser width={100} userName="Mike Scoones" status={"invited"} />
                <CardUser width={100} userName="Mike Scoones" status={"invited"} />
                <CardUser width={100} userName="Mike Scoones" status={"joined"} />
                <CardUser width={100} userName="Mike Scoones" status={"joined"} />
            </div>
            <Button className={classes.questListArrow}>
                <Arrow
                //style={{ transform: "rotate(180deg)" }}
                />
            </Button>
        </div>
    );
};

export default GuestList;

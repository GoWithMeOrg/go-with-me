import React, { useState } from "react";
import dayjs from "dayjs";

import { Button } from "@/components/shared/Button";

import Logogwm from "@/assets/icons/logogwm.svg";

import classes from "./SystemNotification.module.css";

export const SystemNotification = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`${classes.notification} ${expanded ? classes.notificationActive : ""}`}>
            <div className={classes.image}>
                <Logogwm />
            </div>

            <div className={classes.info}>
                <span className={classes.title}>Go With Me Team</span>
                <div className={`${classes.description}` + ` ${expanded ? classes.expanded : ""}`}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet cum ullam modi nam neque placeat iure
                    veniam atque ex dicta? Ad fuga quisquam facilis eaque in alias. Dolorem, adipisci architecto. Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit. Amet cum ullam modi nam neque placeat iure
                    veniam atque ex dicta? Ad fuga quisquam facilis eaque in alias. Dolorem, adipisci architecto. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Error tempore architecto aperiam reiciendis porro
                    vel ratione perferendis voluptatibus, molestiae vero placeat enim sunt accusamus maiores voluptates
                    id mollitia quia at?
                </div>

                <Button className={classes.buttonRead} onClick={toggleDescription}>
                    {expanded ? "CLOSE" : "READ MORE"}
                </Button>
            </div>

            <div className={classes.invationStatus}>
                <div className={classes.invationPlaque}>
                    <div className={classes.invationDate}>{dayjs().format("DD.MM.YY")}</div>
                </div>
            </div>
        </div>
    );
};

export default SystemNotification;

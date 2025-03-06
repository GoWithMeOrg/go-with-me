import { FC } from "react";

import useJoin from "./hooks/useJoin";
import { JoinProps } from "@/components/widgets/Join/types/JoinProps";

import classes from "./Join.module.css";

export const Join: FC<JoinProps> = ({ event_id }) => {
    const { joinedUsers } = useJoin({ event_id });

    return (
        <div className={classes.join}>
            <div>{joinedUsers}</div>
            <span className={classes.joinText}>already joined</span>
        </div>
    );
};

export default Join;

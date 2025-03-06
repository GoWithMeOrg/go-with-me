import { FC } from "react";

import classes from "./Join.module.css";
import useJoin from "./hooks/useJoin";

interface JoinProps {
    event_id: string;
}

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

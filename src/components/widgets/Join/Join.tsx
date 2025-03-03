import { FC } from "react";

import classes from "./Join.module.css";

interface JoinProps {
    joined: number;
}

export const Join: FC<JoinProps> = ({ joined }) => {
    return (
        <div className={classes.join}>
            <div>{joined}</div>
            <span className={classes.joinText}>already joined</span>
        </div>
    );
};

export default Join;

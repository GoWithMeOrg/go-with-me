import { Avatar } from "@/components/shared/Avatar";
import classes from "./CardCompanion.module.css";

import Minus from "@/assets/icons/minus.svg";
import { FC } from "react";
import { Span } from "@/components/shared/Span";

interface CardCompanionProps {
    id: string;
    name: string;
    image: string;
}

export const CardCompanion: FC<CardCompanionProps> = ({ id, name, image }) => {
    return (
        <div className={classes.card}>
            <label className={classes.checkbox}>
                <input type="checkbox" />
            </label>
            <Avatar name={name} image={image} scale={1.8} id={id} />
            <div className={classes.fullName}>
                <Span title={name.split(" ")[0]} className={classes.name} />
                <Span title={name.split(" ")[1]} className={classes.name} />
            </div>

            {/* <Minus className={classes.removeCompanion} onClick={() => removeCompanion(id)} /> */}
        </div>
    );
};

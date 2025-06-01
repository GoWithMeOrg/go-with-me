import { Avatar } from "@/components/shared/Avatar";
import classes from "./CardCompanion.module.css";

import { FC } from "react";
import { Span } from "@/components/shared/Span";
import { Checkbox } from "@/components/shared/Checkbox";

import Minus from "@/assets/icons/minus.svg";
import Email from "@/assets/icons/email.svg";
import Message from "@/assets/icons/message.svg";
import { useCompanions } from "../Companions/hooks/useCompanions";

interface CardCompanionProps {
    id: string;
    name: string;
    image: string;
}

export const CardCompanion: FC<CardCompanionProps> = ({ id, name, image }) => {
    const { removeCompanion } = useCompanions();

    return (
        <div className={classes.card}>
            <div>
                <Checkbox className={classes.position} />
                <Avatar name={name} image={image} scale={1.8} id={id} />
            </div>

            <div className={classes.nameAndIcons}>
                <div className={classes.fullName}>
                    <Span title={name.split(" ")[0]} className={classes.name} />
                    <Span title={name.split(" ")[1]} className={classes.name} />
                </div>

                <div className={classes.icons}>
                    <Email />

                    <Message />

                    <Minus className={classes.removeCompanion} onClick={() => removeCompanion(id)} />
                </div>
            </div>
        </div>
    );
};

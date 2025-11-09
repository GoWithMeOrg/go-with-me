import { FC } from "react";

import { Avatar } from "@/components/shared/Avatar";
import { Span } from "@/components/shared/Span";
import { Checkbox } from "@/components/shared/Checkbox";

import Minus from "@/assets/icons/minus.svg";
import Email from "@/assets/icons/email.svg";
import Message from "@/assets/icons/message.svg";

import classes from "./CardCompanion.module.css";
export interface CardCompanionProps {
    id: string;
    name: string;
    image: string;
    onClickPopupDelete: () => void;
    onClickPopupInvitation: () => void;
    onChange: (checked: boolean) => void;
    select: boolean;
    checked?: boolean;
}

export const CardCompanion: FC<CardCompanionProps> = ({
    id,
    name,
    image,
    onChange,
    select,
    checked,
    onClickPopupDelete,
    onClickPopupInvitation,
}) => {
    const cardCompanionCss = [classes.card, checked && classes.cardBorder].filter(Boolean).join(" ");

    return (
        <div className={cardCompanionCss}>
            <div>
                {select && <Checkbox className={classes.position} onChange={onChange} id={id} checked={checked} />}

                <Avatar name={name} image={image} scale={1.8} id={id} />
            </div>

            <div className={classes.nameAndIcons}>
                <div className={classes.fullName}>
                    <Span title={name.split(" ")[0]} className={classes.name} />
                    <Span title={name.split(" ")[1]} className={classes.name} />
                </div>

                <div className={classes.icons}>
                    <Email onClick={onClickPopupInvitation} />

                    {/* <Message /> */}

                    <Minus className={classes.removeCompanion} onClick={onClickPopupDelete} />
                </div>
            </div>
        </div>
    );
};

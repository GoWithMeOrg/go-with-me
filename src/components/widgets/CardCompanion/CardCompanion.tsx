import { Dispatch, FC, SetStateAction } from "react";

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
    onShowPopup: () => void;
    setDelCompanion: Dispatch<SetStateAction<{ id: string; name: string } | null>>;
    setInvitateCompanion: Dispatch<SetStateAction<{ id: string; name: string } | null>>;
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
    onShowPopup,
    setDelCompanion,
    setInvitateCompanion,
}) => {
    const CardCompanionCss = [classes.card, checked && classes.cardBorder].filter(Boolean).join(" ");
    const handleClick = () => {
        setDelCompanion({ id, name });
        onShowPopup();
    };

    const handleClickInviate = () => {
        setInvitateCompanion({ id, name });
        onShowPopup();
    };

    return (
        <div className={CardCompanionCss}>
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
                    <Email onClick={handleClickInviate} />

                    {/* <Message /> */}

                    <Minus className={classes.removeCompanion} onClick={handleClick} />
                </div>
            </div>
        </div>
    );
};

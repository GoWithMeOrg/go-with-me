import { FC } from "react";

import { Avatar } from "@/components/shared/Avatar";
import { Span } from "@/components/shared/Span";
import { Checkbox } from "@/components/shared/Checkbox";

import Minus from "@/assets/icons/minus.svg";
import Email from "@/assets/icons/email.svg";
import Message from "@/assets/icons/message.svg";

import { useCompanions } from "@/components/widgets/Companions/hooks/useCompanions";

import { Popup } from "@/components/shared/Popup";
import { DeleteFriendModal } from "@/components/widgets/DeleteFriendModal";
import { Button } from "@/components/shared/Button";

import classes from "./CardCompanion.module.css";
export interface CardCompanionProps {
    id: string;
    name: string;
    image: string;
    onChange: (checked: boolean) => void;
    select: boolean;
}

export const CardCompanion: FC<CardCompanionProps> = ({ id, name, image, onChange, select }) => {
    const { removeCompanion, handleShowPopup, handleHidePopup, showPopup, container, popupCss, refPopup } =
        useCompanions();

    const handleDeleteCompanion = () => {
        try {
            removeCompanion(id);
            handleHidePopup;
        } catch (error) {
            console.error("DeleteFriendModal - Error deleting companion: ", error);
        }
    };

    return (
        <div className={classes.card}>
            <div>
                {select && <Checkbox className={classes.position} onChange={onChange} id={id} />}

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

                    <Minus className={classes.removeCompanion} onClick={handleShowPopup} />
                    {/* <Popup showPopup={showPopup} container={container} popupCss={popupCss} refPopup={refPopup}>
                        <DeleteFriendModal name={name}>
                            <Button className={classes.delete} onClick={handleDeleteCompanion}>
                                Yes
                            </Button>
                            <Button onClick={handleHidePopup}>Cancel</Button>
                        </DeleteFriendModal>
                    </Popup> */}
                </div>
            </div>
        </div>
    );
};

import { FC } from "react";

import { Avatar } from "@/components/shared/Avatar";
import { Span } from "@/components/shared/Span";
import { Checkbox } from "@/components/shared/Checkbox";

import Minus from "@/assets/icons/minus.svg";
import Email from "@/assets/icons/email.svg";
import Message from "@/assets/icons/message.svg";

import { useCompanions } from "@/components/widgets/Companions/hooks/useCompanions";

import classes from "./CardCompanion.module.css";
import { Popup } from "@/components/shared/Popup";
import { usePopup } from "@/components/shared/Popup/hooks/usePopup";
import DeleteFriendModal from "../DeleteFriendModal";
interface CardCompanionProps {
    id: string;
    name: string;
    image: string;
    onChange: (checked: boolean) => void;
    select: boolean;
    onDeleteClick: (id: string, name: string) => void;
}

export const CardCompanion: FC<CardCompanionProps> = ({ id, name, image, onChange, select, onDeleteClick }) => {
    const { handleShowPopup, handleHidePopup, showPopup, setShowPopup } = usePopup({ popupMode: "map" });

    const { removeCompanion } = useCompanions();

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

                    <Minus
                        className={classes.removeCompanion}
                        // onClick={() => onDeleteClick(id, name)}
                        onClick={handleShowPopup}
                    />
                    <Popup popupMode={"map"} showPopup={showPopup} setShowPopup={setShowPopup}>
                        <DeleteFriendModal onClose={handleHidePopup} companionId={id} name={name} />
                    </Popup>
                </div>
            </div>
        </div>
    );
};

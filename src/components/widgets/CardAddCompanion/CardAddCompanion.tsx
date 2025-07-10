import { Dispatch, FC, SetStateAction } from "react";

import { Popup } from "@/components/shared/Popup";
import { Span } from "@/components/shared/Span";
import { Avatar } from "@/components/shared/Avatar";

import { useCompanions } from "../Companions/hooks/useCompanions";

import Close from "@/assets/icons/close.svg";
import Plus from "@/assets/icons/plus.svg";

import classes from "./CardAddCompanion.module.css";

export interface CardAddCompanionProps {
    id: string;
    name: string;
    image: string;
    onClick: () => void;
    setSelectedUser: Dispatch<SetStateAction<{ id: string; name: string } | null>>;
}

export const CardAddCompanion: FC<CardAddCompanionProps> = ({ id, name, image, onClick, setSelectedUser }) => {
    // const { showPopup, container, popupCss, refPopup, handleHidePopup, handleShowPopup, sendRequestCompanion } =
    //     useCompanions();

    const idName = () => {
        setSelectedUser({ id, name });
        onClick();
    };

    return (
        <div key={id}>
            <div className={classes.avatar}>
                <Avatar name={name} image={image} scale={1.8} id={id} />

                <Plus className={classes.addCompanion} onClick={idName} />
            </div>

            <Span title={name.split(" ")[0]} className={classes.name} />
            <Span title={name.split(" ")[1]} className={classes.name} />
        </div>
    );
};

import { FC } from "react";

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
}

export const CardAddCompanion: FC<CardAddCompanionProps> = ({ id, name, image }) => {
    const { showPopup, container, popupCss, refPopup, handleHidePopup, sendRequestCompanion } = useCompanions();

    return (
        <div key={id}>
            <div className={classes.avatar}>
                <Avatar name={name} image={image} scale={1.8} id={id} />

                <Plus className={classes.addCompanion} onClick={() => sendRequestCompanion(id)} />

                <Popup showPopup={showPopup} container={container} popupCss={popupCss} refPopup={refPopup}>
                    <div className={classes.content}>
                        <Close className={classes.close} onClick={handleHidePopup} />
                        <span className={classes.actions}>
                            <p>
                                Ваша заявка в друзья <br />
                                <span>{name}</span>
                                отправлена
                            </p>
                        </span>
                    </div>
                </Popup>
            </div>

            <Span title={name.split(" ")[0]} className={classes.name} />
            <Span title={name.split(" ")[1]} className={classes.name} />
        </div>
    );
};

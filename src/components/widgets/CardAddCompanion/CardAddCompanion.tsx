import { Dispatch, FC, SetStateAction } from "react";

import { Span } from "@/components/shared/Span";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/shared/Button";

import Plus from "@/assets/icons/plus.svg";

import classes from "./CardAddCompanion.module.css";

export interface CardAddCompanionProps {
    id: string;
    name: string;
    image: string;
    onShowPopup: (id: string) => void;
    setAddedUser: Dispatch<SetStateAction<{ id: string; name: string } | null>>;
}

export const CardAddCompanion: FC<CardAddCompanionProps> = ({ id, name, image, onShowPopup, setAddedUser }) => {
    const handleClick = () => {
        setAddedUser({ id, name });
        onShowPopup(id);
    };

    return (
        <div key={id}>
            <div className={classes.avatar}>
                <Avatar name={name} image={image} scale={1.8} id={id} />

                <Plus className={classes.addCompanion} onClick={handleClick} />
            </div>

            <Span title={name.split(" ")[0]} className={classes.name} />
            <Span title={name.split(" ")[1]} className={classes.name} />
        </div>
    );
};

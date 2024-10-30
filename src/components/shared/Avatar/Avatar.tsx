import { FC, HTMLAttributes } from "react";
import Image from "next/image";

import { IUser } from "@/database/types/User";
import { getContent } from "./helpers";

import classes from "./Avatar.module.css";

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, Pick<IUser, "name"> {
    scale?: number;
    image?: string;
}

export const Avatar: FC<AvatarProps> = ({ image, name, scale = 1 }) => {
    return (
        <div style={{ width: `calc(${scale} * 3.5rem)` }}>
            <div className={[classes.avatar, !image && classes.background].filter(Boolean).join(" ")}>
                {image ? (
                    <Image className={classes.image} alt={name} src={image} fill></Image>
                ) : (
                    <p className={classes.content} style={{ fontSize: `calc(${scale} * 1rem)` }}>
                        {getContent(name)}
                    </p>
                )}
            </div>
        </div>
    );
};

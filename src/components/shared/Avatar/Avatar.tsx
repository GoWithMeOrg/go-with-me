import { FC, HTMLAttributes } from "react";

import { IUser } from "@/database/models/User";
import { getContent } from "./helpers";

import styles from "./Avatar.module.css";

interface AvatarProps extends HTMLAttributes<HTMLDivElement>, Pick<IUser, "name"> {
    scale?: number;
}

export const Avatar: FC<AvatarProps> = ({ name, scale = 1 }) => {
    return (
        <div style={{ width: `calc(${scale} * 3.5rem)` }}>
            <div className={styles.avatar}>
                <div className={styles.content} style={{ transform: `scale(${scale})` }}>
                    {getContent(name)}
                </div>
            </div>
        </div>
    );
};

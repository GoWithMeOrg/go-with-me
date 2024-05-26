import { FC, HTMLAttributes } from "react";
import styles from "./Avatar.module.css";
import { getContent } from "./helpers";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    userName: string;
    scale?: number;
}

export const Avatar: FC<AvatarProps> = ({ userName, scale = 1 }) => {
    return (
        <div style={{ width: `calc(${scale} * 3.5rem)` }}>
            <div className={styles.avatar}>
                <div className={styles.content} style={{ transform: `scale(${scale})` }}>
                    {getContent(userName)}
                </div>
            </div>
        </div>
    );
};

import React, { FC } from "react";

import classes from "./Badges.module.css";

interface IBadges extends React.PropsWithChildren {
    badges: string[];
    icon?: React.ReactNode;
    onDeleteBadge?: (badge: string[]) => void;
}

export const Badges: FC<IBadges> = ({ onDeleteBadge, badges, icon }) => {
    const handleDeleteBadge = (badge: string) => {
        onDeleteBadge?.(badges.splice(badges.indexOf(badge), 1));
    };

    return (
        <ul className={classes.badgeList}>
            {badges.map((badge, index) => (
                <li key={index} className={classes.badgeItem}>
                    {badge}
                    <button onClick={() => handleDeleteBadge(badge)}>{icon}</button>
                </li>
            ))}
        </ul>
    );
};

export default Badges;

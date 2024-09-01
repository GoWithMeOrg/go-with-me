import React, { FC, HTMLAttributes, useMemo } from "react";

import classes from "./Badges.module.css";

interface IBadges extends HTMLAttributes<HTMLUListElement> {
    badges: string[];
    icon?: React.ReactNode;
    onDeleteBadge?: (badge: string[]) => void;
    size?: "normal" | "small";
}

export const Badges: FC<IBadges> = ({ onDeleteBadge, badges, icon, className, size, ...rest }) => {
    const badgeCssString = useMemo(
        () => [classes.badge, size === "small" && classes.small, className].filter(Boolean).join(" "),
        [className, size],
    );

    const handleDeleteBadge = (badge: string) => {
        onDeleteBadge?.(badges.splice(badges.indexOf(badge), 1));
    };

    return (
        <ul className={classes.badgeList} {...rest}>
            {badges.map((badge, index) => (
                <li key={index} className={badgeCssString}>
                    {badge}
                    <button onClick={() => handleDeleteBadge(badge)}>{icon}</button>
                </li>
            ))}
        </ul>
    );
};

export default Badges;

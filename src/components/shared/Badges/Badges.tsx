import React, { FC, HTMLAttributes, useMemo } from "react";

import classes from "./Badges.module.css";

interface IBadges extends HTMLAttributes<HTMLUListElement> {
    badges: string[];
    icon?: React.ReactNode;
    onDeleteBadge?: (badge: string[]) => void;
    size?: Sizes;
}

enum Sizes {
    NORMAL = "normal",
    SMALL = "small",
}

export const Badges: FC<IBadges> = ({ onDeleteBadge, badges, icon, className, size, ...rest }) => {
    const badgeCssString = useMemo(
        () => [classes.badge, size === Sizes.SMALL && classes.small, className].filter(Boolean).join(" "),
        [className, size],
    );

    const handleDeleteBadge = (badge: string) => {
        onDeleteBadge?.(badges.splice(badges.indexOf(badge), 1));
    };

    return (
        <ul className={classes.badgeList} {...rest}>
            {badges.map((badge) => (
                <li key={badge} className={badgeCssString}>
                    {badge}
                    <button onClick={() => handleDeleteBadge(badge)}>{icon}</button>
                </li>
            ))}
        </ul>
    );
};

export default Badges;

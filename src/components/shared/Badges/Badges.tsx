import React, { FC } from "react";

import classes from "./CategoryLabel.module.css";

interface IBadges extends React.PropsWithChildren {
    selectedCategories: string[];
    icon: React.ReactNode;
}

export const Badges: FC<IBadges> = ({ selectedCategories, icon }) => {
    return (
        <ul className={classes.selectedCategories}>
            {selectedCategories.map((badge, index) => (
                <li key={index} className={classes.selectedCategory}>
                    {badge}
                    {icon}
                </li>
            ))}
        </ul>
    );
};

export default Badges;

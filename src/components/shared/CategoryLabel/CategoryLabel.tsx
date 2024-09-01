import React, { FC } from "react";

import classes from "./CategoryLabel.module.css";

interface ICategoryLabel extends React.PropsWithChildren {
    selectedCategories: string[];
    icon: React.ReactNode;
}

export const CategoryLabel: FC<ICategoryLabel> = ({ selectedCategories, icon }) => {
    return (
        <ul className={classes.selectedCategories}>
            {selectedCategories.map((category, index) => (
                <li key={index} className={classes.selectedCategory}>
                    {category}
                    {icon}
                </li>
            ))}
        </ul>
    );
};

export default CategoryLabel;

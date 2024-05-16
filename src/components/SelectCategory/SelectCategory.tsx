import { useState } from "react";
import { Dropdown } from "../Dropdown";
import classes from "./SelectCategory.module.css";

interface ISelectCategory {
    titleCategories: string;
    eventCategories: string[];
}

export const SelectCategory = ({ eventCategories, titleCategories }: ISelectCategory) => {
    const [categories, setCategories] = useState<string[]>(eventCategories ?? []);

    const handleCategoryChange = (selectedCategories: any) => {
        setCategories(selectedCategories);
    };

    return (
        <div className={classes.selectedCategoriesLabel}>
            <span className={classes.selectedCategoriesTitle}>{titleCategories}</span>
            <Dropdown
                textButton={"No category"}
                className={classes.dropdownButton}
                categoriesData={eventCategories ?? []}
                onSelectedCategories={handleCategoryChange}
            />
        </div>
    );
};

export default SelectCategory;

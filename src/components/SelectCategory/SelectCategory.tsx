import { useState } from "react";
import { Dropdown } from "../Dropdown";
import classes from "./SelectCategory.module.css";

export interface ICategory {
    label: string;
    icon?: JSX.Element;
    onClick?: () => void;
    className?: string;
}
interface ISelectCategory {
    categoryList: ICategory[];
    titleCategories: string;
    eventCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
}

export const SelectCategory = ({
    categoryList,
    eventCategories,
    titleCategories,
    onCategoriesChange,
}: ISelectCategory) => {
    const [categories, setCategories] = useState<string[]>(eventCategories ?? []);

    const handleCategoryChange = (selectedCategories: string[]) => {
        setCategories(selectedCategories);
        if (onCategoriesChange) onCategoriesChange(categories);
    };

    return (
        <div className={classes.selectedCategoriesLabel}>
            <span className={classes.selectedCategoriesTitle}>{titleCategories}</span>
            <Dropdown
                textButton={"No category"}
                className={classes.dropdownButton}
                categoriesData={categories ?? []}
                onSelectedCategories={handleCategoryChange}
                list={categoryList}
            />
        </div>
    );
};

export default SelectCategory;

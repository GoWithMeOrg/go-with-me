import { forwardRef } from "react";

import { Dropdown } from "@/components/shared/Dropdown";
import { Label } from "@/components/shared/Label";
import { Badges } from "@/components/shared/Badges";
import { useSelectCategory, ISelectCategory } from "./hooks/useSelectCategory";

import Minus from "@/assets/icons/minus.svg";

import classes from "./SelectCategory.module.css";

export const SelectCategory = forwardRef(function SelectCategory(props: ISelectCategory, ref) {
    const { categories, handleCategoryChange } = useSelectCategory(props);

    return (
        <div className={classes.selectedCategoriesLabel}>
            <Label className={classes.selectedCategoriesTitle} label={props.titleCategories} />

            <Dropdown
                label={"No category"}
                categoriesData={props.eventCategories || []}
                onSelectedCategories={handleCategoryChange}
                list={props.categoryList}
            />

            {props.badgesShow && (
                <Badges
                    badges={categories}
                    icon={<Minus style={{ marginLeft: "0.5rem", cursor: "pointer" }} />}
                    onDeleteBadge={handleCategoryChange}
                />
            )}
        </div>
    );
});

export default SelectCategory;

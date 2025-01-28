import { forwardRef, useEffect, useRef, useState } from "react";

import { Dropdown } from "@/components/shared/Dropdown";
import { Label } from "@/components/shared/Label";
import { Badges } from "@/components/shared/Badges";

import Minus from "@/assets/icons/minus.svg";

import classes from "./SelectCategory.module.css";

interface ISelectCategory {
    categoryList: string[];
    titleCategories: string;
    eventCategories?: string[];
    onChange: (e: string[]) => void;
    badgesShow: boolean;
}

export const SelectCategory = forwardRef(function SelectCategory(props: ISelectCategory, ref) {
    const [categories, setCategories] = useState<string[]>([]);
    const prevCategoriesRef = useRef<string[]>(categories ?? []);

    useEffect(() => {
        if (prevCategoriesRef.current !== categories) {
            props.onChange(categories || []);
            prevCategoriesRef.current = categories;
        }
    }, [categories, props]);

    const handleCategoryChange = (selectedCategories: string[]) => {
        setCategories(selectedCategories);
    };

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

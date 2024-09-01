import { forwardRef, useEffect, useRef, useState } from "react";

import { Dropdown } from "@/components/shared/Dropdown";
import { Label } from "@/components/shared/Label";

import classes from "./SelectCategory.module.css";

interface ISelectCategory {
    categoryList: string[];
    titleCategories: string;
    eventCategories?: string[];
    onChange: (e: string[]) => void;
}

export const SelectCategory = forwardRef(function SelectCategory(props: ISelectCategory, ref) {
    const [categories, setCategories] = useState<string[]>([]);
    const prevCategoriesRef = useRef<string[]>(categories ?? []);

    //Отслеживаем изменившиеся категории. Если категории изменились, то вызываем onChange. При вызове OnChange в функции handleCategoryChange получаем бесконечный цикл.
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
                categoriesData={props.eventCategories || ["No category"]}
                onSelectedCategories={handleCategoryChange}
                list={props.categoryList}
            />
        </div>
    );
});

export default SelectCategory;

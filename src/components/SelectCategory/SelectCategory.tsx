import { forwardRef, useEffect, useRef, useState } from "react";
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
            <span className={classes.selectedCategoriesTitle}>{props.titleCategories}</span>
            <Dropdown
                textButton={"No category"}
                className={classes.dropdownButton}
                categoriesData={[]}
                onSelectedCategories={handleCategoryChange}
                list={props.categoryList}
            />
        </div>
    );
});

export default SelectCategory;

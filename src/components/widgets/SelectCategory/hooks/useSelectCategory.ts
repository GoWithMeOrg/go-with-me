import { useEffect, useMemo, useRef, useState } from "react";

export interface ISelectCategory {
    categoryList: string[];
    titleCategories: string;
    eventCategories?: string[];
    onChange: (e: string[]) => void;
    badgesShow: boolean;
}

export const useSelectCategory = ({ onChange }: ISelectCategory) => {
    const [categories, setCategories] = useState<string[]>([]);
    const prevCategoriesRef = useRef<string[]>(categories ?? []);

    useEffect(() => {
        if (prevCategoriesRef.current !== categories) {
            onChange(categories || []);
            prevCategoriesRef.current = categories;
        }
    }, [categories, onChange]);

    const handleCategoryChange = (selectedCategories: string[]) => {
        setCategories(selectedCategories);
    };

    return {
        categories,
        setCategories,
        handleCategoryChange,
    };
};

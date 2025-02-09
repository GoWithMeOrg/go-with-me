import { useEffect, useMemo, useRef, useState } from "react";

export interface ISelectCategory {
    categoryList: string[];
    titleCategories: string;
    eventCategories?: string[];
    onChange: (e: string[]) => void;
    badgesShow: boolean;
}

export const useSelectCategory = ({ onChange }: ISelectCategory) => {
    const [items, setItems] = useState<string[]>([]);
    const prevItemsRef = useRef<string[]>(items ?? []);

    useEffect(() => {
        if (prevItemsRef.current !== items) {
            onChange(items);
            prevItemsRef.current = items;
        }
    }, [items]);

    const handleCategoryChange = (selectedItem: string[]) => {
        setItems(selectedItem);
    };

    return {
        items,
        setItems,
        handleCategoryChange,
    };
};

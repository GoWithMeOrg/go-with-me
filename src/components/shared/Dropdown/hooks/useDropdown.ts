import { Dispatch, PropsWithChildren, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

import { ICategory } from "@/components/widgets/SelectCategory/SelectCategory";

interface useDropdownProps extends PropsWithChildren {
    list: ICategory[];
    categoriesData: string[];
    onSelectedCategories?: (categories: string[]) => void;
    onChange?: (categories: string[]) => void;
}
interface useDropdownReturn extends PropsWithChildren {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    isHovered: boolean[];
    setIsHovered: Dispatch<SetStateAction<boolean[]>>;
    showIcon: (index: number, value: boolean) => void;
    handleDropdown: () => void;
    handleAddCategory: (e: any) => void;
    handleDeleteCategory: (category: string) => void;
    dropdownRef: RefObject<HTMLDivElement>;
}

export const useDropdown = ({
    list,
    categoriesData,
    onSelectedCategories,
    onChange,
}: useDropdownProps): useDropdownReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoriesData);

    const [isHovered, setIsHovered] = useState(Array(list.length).fill(false));
    const dropdownRef = useRef<HTMLDivElement>(null);

    const showIcon = (index: number, value: boolean) => {
        setIsHovered((prevIsHovered) => {
            const updatedIsHovered = [...prevIsHovered];
            updatedIsHovered[index] = value;
            return updatedIsHovered;
        });
    };

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAddCategory = (e: any) => {
        e.preventDefault();
        //получаем родительский элемент
        const parentElement = e.target.closest("[data-category]");
        //получаем значение родительского элемента
        const clickedCategory = parentElement.dataset.category;
        // добавлем если нет елемента в массиве
        setSelectedCategories((prevSelectedCategories) => {
            if (!prevSelectedCategories.includes(clickedCategory)) {
                return prevSelectedCategories.concat(clickedCategory);
            } else {
                // удаляем из массива если элемент в массиве найден
                return prevSelectedCategories.filter((category) => category !== clickedCategory);
            }
        });
    };

    const handleDeleteCategory = (category: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            return prevSelectedCategories.filter((cat) => cat !== category);
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest(`[data-id="${dropdownRef.current.id}"]`)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (onSelectedCategories) {
            onSelectedCategories(selectedCategories);
        }
        if (onChange) {
            onChange(selectedCategories);
        }
    }, [selectedCategories, onSelectedCategories, onChange]);

    return {
        isOpen,
        setIsOpen,
        selectedCategories,
        setSelectedCategories,
        isHovered,
        setIsHovered,
        showIcon,
        handleDropdown,
        handleAddCategory,
        handleDeleteCategory,
        dropdownRef,
    };
};

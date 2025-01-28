import { FC } from "react";

import { Button } from "@/components/shared/Button";
import { useDropdown } from "./hooks";

import Plus from "@/assets/icons/plus.svg";
import Minus from "@/assets/icons/minus.svg";
import ArrowMenu from "@/assets/icons/arrowMenu.svg";

import classes from "./Dropdown.module.css";
interface DropdownProps extends React.PropsWithChildren {
    label?: string;
    categoriesData: string[];
    onSelectedCategories?: (categories: string[]) => void;
    list: string[];
}

export const Dropdown: FC<DropdownProps> = ({ list, label, categoriesData, onSelectedCategories }) => {
    const { isOpen, selectedCategories, isHovered, showIcon, handleDropdown, handleAddCategory, dropdownRef } =
        useDropdown({ list, categoriesData, onSelectedCategories });

    return (
        <div className={classes.dropdown} ref={dropdownRef}>
            <Button className={classes.dropdownButton} onClick={handleDropdown} type="button">
                {selectedCategories.length === 0 ? label : selectedCategories.length + " categories"}
                <ArrowMenu style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </Button>
            {isOpen && (
                <ul className={classes.dropdownList}>
                    {list.map((category, index) => (
                        <li key={index} data-category={category}>
                            <button
                                className={classes.dropdownItem}
                                onClick={handleAddCategory}
                                onMouseEnter={() => showIcon(index, true)}
                                onMouseLeave={() => showIcon(index, false)}
                            >
                                {category}
                                {selectedCategories.includes(category) ? (
                                    <Minus className={classes.dropdownItemMinus} />
                                ) : isHovered[index] ? (
                                    <Plus className={classes.dropdownItemPlus} />
                                ) : null}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

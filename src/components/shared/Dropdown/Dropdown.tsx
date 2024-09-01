import { FC } from "react";

import Plus from "@/assets/icons/plus.svg";
import Minus from "@/assets/icons/minus.svg";
import ArrowMenu from "@/assets/icons/arrowMenu.svg";

import { Badges } from "@/components/shared/Badges";
import { useDropdown } from "./hooks";

import classes from "./Dropdown.module.css";

interface DropdownProps extends React.PropsWithChildren {
    label?: string;
    categoriesData: string[];
    onSelectedCategories?: (categories: string[]) => void;
    list: string[];
    onChange?: (categories: string[]) => void;
}

export const Dropdown: FC<DropdownProps> = ({ list, label, categoriesData, onSelectedCategories }) => {
    const {
        isOpen,
        selectedCategories,
        isHovered,
        showIcon,
        handleDropdown,
        handleAddCategory,
        handleDeleteCategory,
        dropdownRef,
    } = useDropdown({ list, categoriesData, onSelectedCategories });

    return (
        <div className={classes.dropdown} ref={dropdownRef}>
            <div className={classes.dropdownButton} onClick={handleDropdown}>
                {selectedCategories.length === 0 ? label : selectedCategories.length + " category"}
                <ArrowMenu style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
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

            {!isOpen && (
                <Badges
                    selectedCategories={selectedCategories}
                    icon={
                        <Minus
                            style={{ marginLeft: "0.5rem" }}
                            onClick={() => handleDeleteCategory(selectedCategories[0])}
                        />
                    }
                />
            )}
        </div>
    );
};

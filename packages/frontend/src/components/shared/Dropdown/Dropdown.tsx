import { FC } from 'react';
import ArrowMenu from '@/assets/icons/arrowMenu.svg';
import Minus from '@/assets/icons/minus.svg';
import Plus from '@/assets/icons/plus.svg';
import { Button } from '@/components/shared/Button';

import { useDropdown } from './hooks';

import classes from './Dropdown.module.css';

interface DropdownProps extends React.PropsWithChildren {
    label?: string;
    categoriesData: string[];
    onSelectedCategories?: (categories: string[]) => void;
    list: string[];
    filter: boolean;
    itemImages?: Record<string, string>;
    selectedLabel?: (count: number) => string;
}

export const Dropdown: FC<DropdownProps> = ({
    list,
    label,
    categoriesData,
    onSelectedCategories,
    filter,
    itemImages,
    selectedLabel,
}) => {
    const {
        isOpen,
        selectedCategories,
        isHovered,
        showIcon,
        handleDropdown,
        handleAddCategory,
        dropdownRef,
        dropdownCss,
        dropdownItemCss,
        dropdownItemTextCss,
    } = useDropdown({ list, categoriesData, onSelectedCategories, filter });

    return (
        <div className={classes.dropdown} ref={dropdownRef}>
            <Button className={classes.dropdownButton} onClick={handleDropdown} type="button">
                {selectedCategories.length === 0
                    ? label
                    : selectedLabel
                      ? selectedLabel(selectedCategories.length)
                      : selectedCategories.length + ' categories'}
                <ArrowMenu style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </Button>
            {isOpen && (
                <ul className={dropdownCss}>
                    {list.map((category, index) => (
                        <li key={index} data-category={category}>
                            <button
                                className={dropdownItemCss}
                                onClick={handleAddCategory}
                                onMouseEnter={() => showIcon(index, true)}
                                onMouseLeave={() => showIcon(index, false)}
                            >
                                <div className={classes.dropdownItemContent}>
                                    {itemImages?.[category] && (
                                        <img
                                            src={itemImages[category]}
                                            alt=""
                                            className={classes.dropdownItemAvatar}
                                        />
                                    )}
                                    <p className={dropdownItemTextCss}>{category}</p>
                                </div>

                                <div>
                                    {selectedCategories.includes(category) ? (
                                        <Minus className={classes.dropdownItemMinus} />
                                    ) : isHovered[index] ? (
                                        <Plus className={classes.dropdownItemPlus} />
                                    ) : null}
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

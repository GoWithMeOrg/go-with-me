import { useEffect, useRef, useState } from "react";
import Plus from "@/assets/icons/plus.svg";
import Minus from "@/assets/icons/minus.svg";
import ArrowMenu from "@/assets/icons/arrowMenu.svg";
import classes from "./Dropdown.module.css";

interface DropdownProps {
    textButton?: string;
    className?: string;
}

export const Dropdown = ({ textButton, className }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const eventCategory = [
        {
            label: "Music & Concerts",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => handleAddPomodoro(),
            className: "menuItem",
        },

        {
            label: "Sport & Fitness",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => handleShortPomodoro(),
            className: "menuItem",
        },

        {
            label: "Arts & Theatre",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => handleEditNameTask(),
            className: "menuItem",
        },

        {
            label: "Conferences & Workshops",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Food & Drink",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Networking & Social",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Technology & Innovation",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Family & Education",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Health & Wellnes",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Charity & Causes",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Parties & Nightlife",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Travel & Outdoor",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Cultural & Religious",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Fashion & Beauty",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },

        {
            label: "Hobbies & Special interest",
            icon: <Plus transform="scale(0.83)" />,
            //onClick: () => setIsModalOpened(true),
            className: "menuItem",
        },
    ];

    console.log(selectedCategories);

    const handleAddCategory = (e: any) => {
        e.preventDefault();
        // добавлем если нет в елемента в массиве
        setSelectedCategories((prevSelectedCategories) => {
            if (!prevSelectedCategories.includes(e.target.textContent)) {
                return prevSelectedCategories.concat(e.target.textContent);
            } else {
                // удаляем из массива если элемент в массиве найден
                return prevSelectedCategories.filter((category) => category !== e.target.textContent); //prevSelectedCategories;
            }
        });
    };

    const handleDeleteCategory = (category: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            return prevSelectedCategories.filter((cat) => cat !== category);
        });
    };

    return (
        <div className={classes.dropdown}>
            <div className={className} onClick={handleDropdown}>
                {textButton}
                <ArrowMenu style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            {isOpen && (
                <ul className={classes.dropdownList}>
                    {eventCategory.map((category, index) => (
                        <li key={index}>
                            <button className={classes.dropdownItem} onClick={handleAddCategory}>
                                {category.label}
                                <Plus />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <ul className={classes.selectedCategories}>
                {selectedCategories.map((category, index) => (
                    <li key={index} className={classes.selectedCategory}>
                        {category}
                        <Minus style={{ marginLeft: "0.5rem" }} onClick={() => handleDeleteCategory(category)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;

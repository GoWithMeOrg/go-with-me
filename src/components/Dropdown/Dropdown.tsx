import { useEffect, useRef, useState } from "react";
import Plus from "@/assets/icons/plus.svg";
import Minus from "@/assets/icons/minus.svg";
import ArrowMenu from "@/assets/icons/arrowMenu.svg";
import classes from "./Dropdown.module.css";
import { ICategory } from "@/components/SelectCategory/SelectCategory";

interface DropdownProps {
    textButton?: string;
    className?: string;
    categoriesData: string[];
    onSelectedCategories?: (categories: string[]) => void;
    list: ICategory[];
}

//решить вопрос если выбрана категория, то минус на выбранной категории показываем постоянно.
export const Dropdown = ({ list, textButton, className, categoriesData, onSelectedCategories }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoriesData);
    //     {
    //         label: "Party",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => handleAddPomodoro(),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Gathering",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => handleShortPomodoro(),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Meetup",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => handleEditNameTask(),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Conference",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Sport",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Workshop",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Seminar",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Concert",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Festival",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Exhibition",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Networking",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Trade Show",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Class/Course",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Lecture",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Fundraiser",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Gala",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Retreat",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Tour",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Competition",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Competition",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Hackathon",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Fair",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Fair",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Community Service/Volunteer Event",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Open House",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Theater/Play",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },

    //     {
    //         label: "Dance Event",
    //         icon: <Plus transform="scale(0.83)" />,
    //         //onClick: () => setIsModalOpened(true),
    //         className: "menuItem",
    //     },
    // ];

    const [isHovered, setIsHovered] = useState(Array(list.length).fill(false));
    const dropdownRef = useRef<HTMLDivElement>(null);

    //показываем иконку при наведении
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
    }, [selectedCategories, onSelectedCategories]);

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

    return (
        <div className={classes.dropdown} ref={dropdownRef}>
            <div className={className} onClick={handleDropdown}>
                {selectedCategories.length === 0 ? textButton : selectedCategories.length + " category"}
                <ArrowMenu style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            {isOpen && (
                <ul className={classes.dropdownList}>
                    {list.map((category, index) => (
                        <li key={index} data-category={category.label}>
                            <button
                                className={classes.dropdownItem}
                                onClick={handleAddCategory}
                                onMouseEnter={() => showIcon(index, true)}
                                onMouseLeave={() => showIcon(index, false)}
                            >
                                {category.label}
                                {isHovered[index] &&
                                    (selectedCategories.includes(category.label) ? (
                                        <Minus className={classes.dropdownItemMinus} />
                                    ) : (
                                        <Plus className={classes.dropdownItemPlus} />
                                    ))}
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

import React from "react";
import { NavbarEventTabs } from "@/components/widgets/Navbar/models";

import classes from "./NavbarEvents.module.css";

interface INavbarEvents {
    onTabClick: (tab: NavbarEventTabs) => void;
    activeTab: string;
    nameAtribute: string;
    dataAtributes: string[];
}
export const NavbarEvents = ({ onTabClick, activeTab, dataAtributes, nameAtribute }: INavbarEvents) => {
    const handleTabClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const tab = event.currentTarget.getAttribute(nameAtribute);
        if (tab) {
            onTabClick(tab as NavbarEventTabs);
        }
    };

    //TODO: Сделать рефакторинг Navbar, продумать работу с дата атрибутами, сделать компонент универсальным. Заменить NavbarEvents на Navbar
    return (
        <div className={classes.navbar}>
            {dataAtributes.map((tab) => (
                <button
                    key={tab}
                    data-filtered={tab}
                    onClick={handleTabClick}
                    className={`${classes.navbarItem} ${activeTab === tab ? classes.navbarItemActive : ""}`}
                >
                    {/* {tab.toUpperCase()} */}
                    {tab === "list" ? "события" : tab === "map" ? "карта" : tab.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default NavbarEvents;

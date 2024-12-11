import React from "react";

import classes from "./NavbarEvents.module.css";

interface INavbarEvents {
    onTabClick: (tab: string) => void;
    activeTab: string;
}
export const NavbarEvents = ({ onTabClick, activeTab }: INavbarEvents) => {
    return (
        <div className={classes.navbar}>
            <div
                data-filtered="list"
                onClick={() => onTabClick("list")}
                className={`${classes.navbarItem} ${activeTab === "list" && classes.navbarItemActive}`}
            >
                {"LIST"}
            </div>
            <div
                data-filtered="map"
                onClick={() => onTabClick("map")}
                className={`${classes.navbarItem} ${activeTab === "map" && classes.navbarItemActive}`}
            >
                {"MAP"}
            </div>
        </div>
    );
};

export default NavbarEvents;

import React from "react";

import classes from "./Navbar.module.css";

interface INavbar {
    onTabClick: (tab: string) => void;
    activeTab: string;
}
export const Navbar = ({ onTabClick, activeTab }: INavbar) => {
    return (
        <div className={classes.navbar}>
            <div
                data-profile="profile-personal"
                onClick={() => onTabClick("personal")}
                className={`${classes.navbarItem} ${activeTab === "personal" && classes.navbarItemActive}`}
            >
                {"Personal info"}
            </div>
            <div
                data-profile="profile-notifications"
                onClick={() => onTabClick("notifications")}
                className={`${classes.navbarItem} ${activeTab === "notifications" && classes.navbarItemActive}`}
            >
                {"Notifications"}
            </div>
            <div
                data-profile="profile-events"
                className={`${classes.navbarItem} ${activeTab === "events" && classes.navbarItemActive}`}
                onClick={() => onTabClick("events")}
            >
                {"Events"}
            </div>

            <div
                data-profile="profile-trips"
                className={`${classes.navbarItem} ${activeTab === "trips" && classes.navbarItemActive}`}
                onClick={() => onTabClick("trips")}
            >
                {"Trips"}
            </div>

            <div
                data-profile="profile-companions"
                className={`${classes.navbarItem} ${activeTab === "companions" && classes.navbarItemActive}`}
                onClick={() => onTabClick("companions")}
            >
                {"Companion List"}
            </div>

            <div
                data-profile="profile-chat"
                className={`${classes.navbarItem} ${activeTab === "chat" && classes.navbarItemActive}`}
                onClick={() => onTabClick("chat")}
            >
                {"Chat"}
            </div>

            <div
                data-profile="profile-confidentiality"
                className={`${classes.navbarItem} ${activeTab === "confidentiality" && classes.navbarItemActive}`}
                onClick={() => onTabClick("confidentiality")}
            >
                {"Confidentiality"}
            </div>
        </div>
    );
};

export default Navbar;

import React from "react";
import classes from "./Navbar.module.css";

interface INavbar {
    onTabClick: (tab: string) => void;
    activeTab: string;
}
export const Navbar = ({ onTabClick, activeTab }: INavbar) => {
    return (
        <div className={classes.cNav}>
            <div
                data-profile="profile-personal"
                onClick={() => onTabClick("personal")}
                className={`${classes.cNavItem} ${activeTab === "personal" && classes.cNavItemActive}`}
            >
                {"Personal info"}
            </div>
            <div
                data-profile="profile-notifications"
                onClick={() => onTabClick("notifications")}
                className={`${classes.cNavItem} ${activeTab === "notifications" && classes.cNavItemActive}`}
            >
                {"Notifications"}
            </div>
            <div
                data-profile="profile-events"
                className={`${classes.cNavItem} ${activeTab === "events" && classes.cNavItemActive}`}
                onClick={() => onTabClick("events")}
            >
                {"Events"}
            </div>

            <div
                data-profile="profile-trips"
                className={`${classes.cNavItem} ${activeTab === "trips" && classes.cNavItemActive}`}
                onClick={() => onTabClick("trips")}
            >
                {"Trips"}
            </div>

            <div
                data-profile="profile-companions"
                className={`${classes.cNavItem} ${activeTab === "companions" && classes.cNavItemActive}`}
                onClick={() => onTabClick("companions")}
            >
                {"Companion List"}
            </div>

            <div
                data-profile="profile-chat"
                className={`${classes.cNavItem} ${activeTab === "chat" && classes.cNavItemActive}`}
                onClick={() => onTabClick("chat")}
            >
                {"Chat"}
            </div>

            <div
                data-profile="profile-confidentiality"
                className={`${classes.cNavItem} ${activeTab === "confidentiality" && classes.cNavItemActive}`}
                onClick={() => onTabClick("confidentiality")}
            >
                {"Confidentiality"}
            </div>
        </div>
    );
};

export default Navbar;

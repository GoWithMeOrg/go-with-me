import { NavbarTabs } from "@/components/widgets/Navbar/models";

import classes from "./Navbar.module.css";

interface INavbar {
    onTabClick: (tab: NavbarTabs) => void;
    activeTab: NavbarTabs;
}
export const Navbar = ({ onTabClick, activeTab }: INavbar) => {
    return (
        <div className={classes.navbar}>
            <div
                data-profile="profile-personal"
                onClick={() => onTabClick(NavbarTabs.PERSONAL)}
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.PERSONAL && classes.navbarItemActive}`}
            >
                {"Personal info"}
            </div>
            <div
                data-profile="profile-notifications"
                onClick={() => onTabClick(NavbarTabs.NOTIFICATIONS)}
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.NOTIFICATIONS && classes.navbarItemActive}`}
            >
                {"Notifications"}
            </div>
            <div
                data-profile="profile-events"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.EVENTS && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.EVENTS)}
            >
                {"Events"}
            </div>

            <div
                data-profile="profile-trips"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.TRIPS && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.TRIPS)}
            >
                {"Trips"}
            </div>

            <div
                data-profile="profile-companions"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.COMPANIONS && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.COMPANIONS)}
            >
                {"Companion List"}
            </div>

            <div
                data-profile="profile-chat"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.CHAT && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.CHAT)}
            >
                {"Chat"}
            </div>

            <div
                data-profile="profile-confidentiality"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.CONFIDENTIALITY && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.CONFIDENTIALITY)}
            >
                {"Confidentiality"}
            </div>

            <div
                data-profile="profile-list"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.LIST && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.LIST)}
            >
                {"List"}
            </div>
        </div>
    );
};

export default Navbar;

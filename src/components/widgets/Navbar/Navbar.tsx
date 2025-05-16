import { NavbarTabs } from "@/components/widgets/Navbar/models";

import classes from "./Navbar.module.css";
import { useNotifications } from "../Notifications/hooks";

interface INavbar {
    onTabClick: (tab: NavbarTabs) => void;
    activeTab: NavbarTabs;
}
export const Navbar = ({ onTabClick, activeTab }: INavbar) => {
    const { dataApplications } = useNotifications();

    return (
        <div className={classes.navbar}>
            <div className={classes.personal}>
                <div className={classes.whiteDot}></div>
                <div
                    data-profile="profile-personal"
                    onClick={() => onTabClick(NavbarTabs.PERSONAL)}
                    className={`${classes.navbarItem} ${activeTab === NavbarTabs.PERSONAL && classes.navbarItemActive}`}
                >
                    {"Personal info"}
                </div>
            </div>

            <div className={classes.personal}>
                {dataApplications.length > 0 ? (
                    <div className={classes.redDot}></div>
                ) : (
                    <div className={classes.whiteDot}></div>
                )}

                <div
                    data-profile="profile-notifications"
                    onClick={() => onTabClick(NavbarTabs.NOTIFICATIONS)}
                    className={`${classes.navbarItem} ${activeTab === NavbarTabs.NOTIFICATIONS && classes.navbarItemActive}`}
                >
                    {"Notifications"}
                </div>
            </div>

            <div className={classes.personal}>
                <div className={classes.whiteDot}></div>
                <div
                    data-profile="profile-events"
                    className={`${classes.navbarItem} ${activeTab === NavbarTabs.EVENTS && classes.navbarItemActive}`}
                    onClick={() => onTabClick(NavbarTabs.EVENTS)}
                >
                    {"Events"}
                </div>
            </div>

            {/* <div
                data-profile="profile-trips"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.TRIPS && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.TRIPS)}
            >
                {"Trips"}
            </div> */}

            <div className={classes.personal}>
                <div className={classes.whiteDot}></div>
                <div
                    data-profile="profile-companions"
                    className={`${classes.navbarItem} ${activeTab === NavbarTabs.COMPANIONS && classes.navbarItemActive}`}
                    onClick={() => onTabClick(NavbarTabs.COMPANIONS)}
                >
                    {"Companions"}
                </div>
            </div>

            {/* <div
                data-profile="profile-chat"
                className={`${classes.navbarItem} ${activeTab === NavbarTabs.CHAT && classes.navbarItemActive}`}
                onClick={() => onTabClick(NavbarTabs.CHAT)}
            >
                {"Chat"}
            </div> */}

            <div className={classes.personal}>
                <div className={classes.whiteDot}></div>
                <div
                    data-profile="profile-confidentiality"
                    className={`${classes.navbarItem} ${activeTab === NavbarTabs.CONFIDENTIALITY && classes.navbarItemActive}`}
                    onClick={() => onTabClick(NavbarTabs.CONFIDENTIALITY)}
                >
                    {"Confidentiality"}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

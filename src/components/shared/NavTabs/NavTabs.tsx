import classes from "./NavTabs.module.css";

interface NavigationTabsProps<T extends string> {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
}

const NavigationTabs = <T extends string>({ tabs, activeTab, onTabChange }: NavigationTabsProps<T>) => {
    return (
        <nav className={classes.navigationTabs}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`${classes.tabButton} ${activeTab === tab ? classes.active : ""}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </nav>
    );
};

export { NavigationTabs };

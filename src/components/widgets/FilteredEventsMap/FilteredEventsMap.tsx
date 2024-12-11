import React, { useState } from "react";

import { Title } from "@/components/shared/Title";

import { GoogleMap } from "../GoogleMap";
import NavbarEvents from "./NavbarEvents/NavbarEvents";
import { FilterEvents } from "./FilterEvents";

import classes from "./FilteredEventsMap.module.css";
export const FilteredEventsMap = () => {
    const [activeTab, setActiveTab] = useState("list");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.filteredEvents}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Find events" />
                <div className={classes.buttons}>
                    <NavbarEvents onTabClick={handleTabClick} activeTab={activeTab} />
                </div>
            </div>
            <div className={classes.line}></div>

            <div className={classes.filters}>
                <div>Data</div>
                <div>Locations</div>
                <div>Categories</div>
                <div>Subjects</div>
                <div>Add tags</div>
            </div>

            {activeTab === "list" && <FilterEvents />}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default FilteredEventsMap;

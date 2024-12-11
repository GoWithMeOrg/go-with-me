import React, { useState } from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";

import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { EventListHome } from "../EvenListHome";

import classes from "./FilteredEvents.module.css";
import { GoogleMap } from "../GoogleMap";
import NavbarEvents from "./NavbarEvents/NavbarEvents";

export const FilteredEvents = () => {
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
            {activeTab === "list" && <EventListHome sizeCard={SizeCard.L} />}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default FilteredEvents;

import React, { useState } from "react";

import { Title } from "@/components/shared/Title";

import { GoogleMap } from "../GoogleMap";
import { NavbarEvents } from "@/components/widgets/EventFilters/NavbarEvents";
import { FilteredEvents } from "@/components/widgets/EventFilters/FilteredEvents";
import { SelectItems } from "@/components/widgets/SelectItems";
import { CreateTag } from "@/components/widgets/CreateTag";
import { Date } from "@/components/widgets/Date";

import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";

import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { NavbarEventTabs } from "../Navbar/models";
import { FilteredEventsLocation } from "@/components/widgets/FilteredEventsLocation";

import { useEventFilters } from "./hooks/useEventFilters";
import { useEventListHome } from "@/components/widgets/EvenListHome/hook/useEventListHome";

import classes from "./EventFilters.module.css";

export const EventFilters = () => {
    const [activeTab, setActiveTab] = useState(NavbarEventTabs.LIST);
    const {
        setSelectedLocation,
        filteredData,
        handleDateChange,
        handleCategoriesChange,
        handleTagsChange,
        handleTypesChange,
    } = useEventFilters();

    const { data } = useEventListHome();

    const handleTabClick = (tab: NavbarEventTabs) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.filteredEvents}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Find events" />
                <div className={classes.buttons}>
                    <NavbarEvents
                        onTabClick={handleTabClick}
                        activeTab={activeTab}
                        dataAtributes={["list", "map"]}
                        nameAtribute={"data-filtered"}
                    />
                </div>
            </div>
            <div className={classes.line}></div>

            <div className={classes.filters}>
                <Date title={"Date"} onChange={handleDateChange} />

                <FilteredEventsLocation onChange={setSelectedLocation} />

                <SelectItems
                    categoryList={eventCategory}
                    titleCategories={"Category"}
                    badgesShow={false}
                    onChange={handleCategoriesChange}
                />

                <SelectItems
                    categoryList={eventTypes}
                    titleCategories={"Types"}
                    badgesShow={false}
                    onChange={handleTypesChange}
                />
                <CreateTag eventTags={[]} onChange={handleTagsChange} />
            </div>

            {activeTab === "list" && (
                <FilteredEvents data={filteredData?.eventFilters || data?.events} sizeCard={SizeCard.ML} />
            )}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default EventFilters;

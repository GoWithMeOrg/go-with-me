import React, { useState } from "react";

import { Title } from "@/components/shared/Title";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";

import { GoogleMap } from "../GoogleMap";
import { NavbarEvents } from "@/components/widgets/EventFilters/NavbarEvents";
import { FilteredEvents } from "@/components/widgets/EventFilters/FilteredEvents";
import { SelectItems } from "@/components/widgets/SelectItems";
import { CreateTag } from "@/components/widgets/CreateTag";
import { Date } from "@/components/widgets/Date";
import { optionsCities } from "@/components/widgets/GoogleMap/OptionsAutocomplete";
import { useEventList } from "@/components/widgets/EventList/hooks";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { FilteredEventsLocation } from "@/components/widgets/FilteredEventsLocation";
import { Backdrop } from "@/components/widgets/Backdrop";

import { NavbarEventTabs } from "../Navbar/models";

import { useEventFilters } from "./hooks/useEventFilters";

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

    const { events, loading } = useEventList({});
    const handleTabClick = (tab: NavbarEventTabs) => {
        setActiveTab(tab);
    };

    return (
        <div className={classes.filteredEvents}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Найти события" />
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
                <Date title={"Дата"} onChange={handleDateChange} />

                <FilteredEventsLocation onChange={setSelectedLocation} options={optionsCities} />

                <SelectItems
                    categoryList={eventCategory}
                    titleCategories={"Категории"}
                    badgesShow={false}
                    onChange={handleCategoriesChange}
                    width={"14.68rem"}
                    filter
                />

                <SelectItems
                    categoryList={eventTypes}
                    titleCategories={"Типы"}
                    badgesShow={false}
                    onChange={handleTypesChange}
                    width={"14.68rem"}
                    filter
                />
                <CreateTag eventTags={[]} onChange={handleTagsChange} title={"Поиск по тегу"} />
            </div>

            {activeTab === "list" && (
                <Backdrop marginTop={84} marginBottom={274} contentLoading={loading}>
                    <FilteredEvents data={filteredData?.eventFilters || events} sizeCard={SizeCard.ML} />
                </Backdrop>
            )}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default EventFilters;

import React, { useState } from "react";

import { Title } from "@/components/shared/Title";

import { Autocomplete, GoogleMap } from "../GoogleMap";
import NavbarEvents from "./NavbarEvents/NavbarEvents";
import { FilterEvents } from "./FilterEvents";

import classes from "./FilteredEventsMap.module.css";
import { SelectCategory } from "../SelectCategory";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { CreateTag } from "@/components/widgets/CreateTag";
import { Location } from "@/components/widgets/Location";
import { Date } from "@/components/widgets/Date";
import dayjs from "dayjs";
export const FilteredEventsMap = () => {
    const [activeTab, setActiveTab] = useState("list");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //преобразуем дату обратно в iso
        setSelectedDate(dayjs(e.target.value).toISOString());
    };

    console.log(selectedDate);
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
                <Date title={"Date"} onChange={handleDateChange} />
                <Location onChange={() => {}} locationEvent={undefined} hideButtonMap={true} />
                <SelectCategory categoryList={eventCategory} titleCategories={"Category"} onChange={() => {}} />
                <SelectCategory categoryList={eventTypes} titleCategories={"Select category"} onChange={() => {}} />
                <CreateTag
                    eventTags={[]}
                    onChange={function (e: string[]): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>

            {activeTab === "list" && <FilterEvents />}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default FilteredEventsMap;

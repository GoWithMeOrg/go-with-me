import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import gql from "graphql-tag";

import { Title } from "@/components/shared/Title";

import { GoogleMap } from "../GoogleMap";
import { NavbarEvents } from "@/components/widgets/FilteredEventsMap/NavbarEvents";
import { FilterEvents } from "@/components/widgets/FilteredEventsMap/FilterEvents";

import { SelectCategory } from "@/components/widgets/SelectCategory";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { CreateTag } from "@/components/widgets/CreateTag";
import { Location } from "@/components/widgets/Location";
import { Date } from "@/components/widgets/Date";

import { SizeCard } from "../CardEvent/CardEvent";
import { NavbarEventTabs } from "../Navbar/models";

import classes from "./FilteredEventsMap.module.css";
import { Navbar } from "../Navbar";

const GET_EVENTS_BY_DATE = gql`
    query EventsByDate($date: String!) {
        eventsByDate(date: $date) {
            _id
            name
            startDate
            location {
                coordinates
                properties {
                    address
                }
            }
            organizer {
                image
                firstName
            }
            description
            time
            image
        }
    }
`;

export const FilteredEventsMap = () => {
    const [activeTab, setActiveTab] = useState(NavbarEventTabs.LIST);
    const [selectedDate, setSelectedDate] = useState<string>("");

    const { data: searchDate } = useQuery(GET_EVENTS_BY_DATE, {
        variables: { date: selectedDate },
    });

    const handleTabClick = (tab: NavbarEventTabs) => {
        setActiveTab(tab);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isDateFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(e.target.value);
        if (isDateFormatValid) {
            setSelectedDate(dayjs(e.target.value).toISOString());
        }
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
                <Location onChange={() => {}} hideButtonMap={true} />
                <SelectCategory categoryList={eventCategory} titleCategories={"Category"} onChange={() => {}} />
                <SelectCategory categoryList={eventTypes} titleCategories={"Select category"} onChange={() => {}} />
                <CreateTag eventTags={[]} onChange={console.warn} />
            </div>

            {activeTab === "list" && <FilterEvents data={searchDate} sizeCard={SizeCard.ML} />}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default FilteredEventsMap;

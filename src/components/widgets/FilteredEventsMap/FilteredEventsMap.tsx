import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import gql from "graphql-tag";

import { Title } from "@/components/shared/Title";

import { Autocomplete, GoogleMap } from "../GoogleMap";
import { NavbarEvents } from "@/components/widgets/FilteredEventsMap/NavbarEvents";
import { FilterEvents } from "@/components/widgets/FilteredEventsMap/FilterEvents";

import { SelectCategory } from "@/components/widgets/SelectCategory";
import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";
import { CreateTag } from "@/components/widgets/CreateTag";
import { Location } from "@/components/widgets/Location";
import { Date } from "@/components/widgets/Date";

import classes from "./FilteredEventsMap.module.css";
import { SizeCard } from "../CardEvent/CardEvent";
import { set } from "mongoose";

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
    const [activeTab, setActiveTab] = useState("list");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const { data: searchDate } = useQuery(GET_EVENTS_BY_DATE, {
        variables: { date: selectedDate },
    });

    // console.log(searchDate);
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //преобразуем дату обратно в iso
        const inputDate = e.target.value;
        // проверка даты на валидность иначе ошибка
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(inputDate);
        if (isValidDate) {
            setSelectedDate(dayjs(e.target.value).toISOString());
        }
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

            {activeTab === "list" && <FilterEvents data={searchDate} sizeCard={SizeCard.ML} />}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default FilteredEventsMap;

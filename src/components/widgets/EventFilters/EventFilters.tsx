import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import gql from "graphql-tag";

import { Title } from "@/components/shared/Title";

import { GoogleMap } from "../GoogleMap";
import { NavbarEvents } from "@/components/widgets/EventFilters/NavbarEvents";
import { FilteredEvents } from "@/components/widgets/EventFilters/FilteredEvents";
import { SelectCategory } from "@/components/widgets/SelectCategory";
import { CreateTag } from "@/components/widgets/CreateTag";
import { Date } from "@/components/widgets/Date";

import { eventCategory, eventTypes } from "@/components/shared/Dropdown/dropdownLists";

import { SizeCard } from "../CardEvent/CardEvent";
import { NavbarEventTabs } from "../Navbar/models";
import { FilteredEventsLocation } from "../FilteredEventsLocation";

import classes from "./EventFilters.module.css";

type Bounds = {
    south: number;
    west: number;
    north: number;
    east: number;
};

const GET_EVENT_FILTERS = gql`
    query EventFilters($date: String, $bounds: Bounds, $categories: [String], $types: [String], $tags: [String]) {
        eventFilters(date: $date, bounds: $bounds, categories: $categories, types: $types, tags: $tags) {
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

export const EventFilters = () => {
    const [activeTab, setActiveTab] = useState(NavbarEventTabs.LIST);
    const [date, setDate] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<google.maps.places.PlaceResult | null>(null);
    const [bounds, setBounds] = useState<Bounds | null>(null);
    const [categories, setCategories] = useState<string[] | null>(null);
    const [types, setTypes] = useState<string[] | null>(null);
    const [tags, setTags] = useState<string[] | null>(null);

    const {
        data: filteredData,
        error,
        refetch,
    } = useQuery(GET_EVENT_FILTERS, {
        skip: !date && !bounds && !categories?.length && !types?.length && !tags?.length, // Пропуск запроса, если нет фильтров
        variables: {
            date: date || undefined,
            bounds: bounds || undefined,
            categories: categories?.length ? categories : undefined,
            types: types?.length ? types : undefined,
            tags: tags?.length ? tags : undefined,
        },
    });

    useEffect(() => {
        if (!selectedLocation?.geometry?.viewport) {
            console.warn("Viewport отсутствует в selectedLocation");
            return;
        }

        const viewport = selectedLocation.geometry.viewport;

        const bounds = {
            south: Number(viewport.getSouthWest()?.lat()) || 0,
            west: Number(viewport.getSouthWest()?.lng()) || 0,
            north: Number(viewport.getNorthEast()?.lat()) || 0,
            east: Number(viewport.getNorthEast()?.lng()) || 0,
        };

        if ([bounds.south, bounds.west, bounds.north, bounds.east].some(isNaN)) {
            console.error("Некорректные значения в bounds:", bounds);
            return;
        }

        setBounds(bounds);
        refetch();
    }, [selectedLocation, refetch]);

    console.log(selectedLocation);
    const handleTabClick = (tab: NavbarEventTabs) => {
        setActiveTab(tab);
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isDateFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(e.target.value);
        if (isDateFormatValid) {
            setDate(dayjs(e.target.value).toISOString());
        }
        refetch();
    };

    const handleCategoriesChange = (categories: string[]) => {
        setCategories(categories);
        refetch();
    };

    const handleTypesChange = (types: string[]) => {
        setTypes(types);
        refetch();
    };

    const handleTagsChange = (tags: string[]) => {
        setTags(tags);
        refetch();
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

                <SelectCategory
                    categoryList={eventCategory}
                    titleCategories={"Category"}
                    badgesShow={false}
                    onChange={handleCategoriesChange}
                />
                <SelectCategory
                    categoryList={eventTypes}
                    titleCategories={"Types"}
                    badgesShow={false}
                    onChange={handleTypesChange}
                />
                <CreateTag eventTags={[]} onChange={handleTagsChange} />
            </div>

            {activeTab === "list" && <FilteredEvents data={filteredData?.eventFilters} sizeCard={SizeCard.ML} />}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default EventFilters;

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

const GET_EVENTS_BY_LOCATION = gql`
    query GetEventsByLocation($bounds: Bounds!) {
        eventSearchByLocation(bounds: $bounds) {
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

const GET_EVENTS_BY_CATEGORIES = gql`
    query GetEventsByCategories($categories: [String]!) {
        eventSearchByCategories(categories: $categories) {
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

const GET_EVENTS_BY_TYPES = gql`
    query GetEventsByTypes($types: [String]!) {
        eventSearchByTypes(types: $types) {
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
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<google.maps.places.PlaceResult | null>(null);
    const [bounds, setBounds] = useState<Bounds | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    const { data: searchDate } = useQuery(GET_EVENTS_BY_DATE, {
        variables: { date: selectedDate },
    });

    const { data: searchEventByLocation } = useQuery(GET_EVENTS_BY_LOCATION, {
        variables: { bounds },
    });

    const { data: searchEventByCategories } = useQuery(GET_EVENTS_BY_CATEGORIES, {
        variables: { categories },
    });

    const { data: searchEventByTypes } = useQuery(GET_EVENTS_BY_TYPES, {
        variables: { types: categories },
    });

    console.log(searchEventByTypes?.eventSearchByTypes);

    const normalizeViewport = (viewport: any) => {
        return {
            south: viewport?.ei?.lo,
            west: viewport?.Hh?.lo,
            north: viewport?.ei?.hi,
            east: viewport?.Hh?.hi,
        };
    };

    useEffect(() => {
        const viewport = normalizeViewport(selectedLocation?.geometry?.viewport);
        setBounds(viewport);
    }, [selectedLocation]);

    const handleTabClick = (tab: NavbarEventTabs) => {
        setActiveTab(tab);
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isDateFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(e.target.value);
        if (isDateFormatValid) {
            setSelectedDate(dayjs(e.target.value).toISOString());
        }
    };

    const handleCategoriesChange = (categories: string[]) => {
        setCategories(categories);
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
                    onChange={handleCategoriesChange}
                />
                <CreateTag eventTags={[]} onChange={console.warn} />
            </div>

            {activeTab === "list" && (
                <FilteredEvents
                    // Подумать разделить на компоненты, под разные дата данные
                    data={
                        searchDate?.eventsByDate ||
                        searchEventByLocation?.eventSearchByLocation ||
                        searchEventByCategories?.eventSearchByCategories ||
                        searchEventByTypes?.eventSearchByTypes
                    }
                    sizeCard={SizeCard.ML}
                />
            )}
            {activeTab === "map" && <GoogleMap />}
        </div>
    );
};

export default EventFilters;

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import dayjs from "dayjs";

type Bounds = {
    south: number;
    west: number;
    north: number;
    east: number;
};

const GET_EVENTS_FILTERED = gql`
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
export const useEventFilters = () => {
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
    } = useQuery(GET_EVENTS_FILTERED, {
        skip: !date && !bounds && !categories?.length && !types?.length && !tags?.length,
        variables: {
            date: date || undefined,
            bounds: bounds || undefined,
            categories: categories?.length ? categories : undefined,
            types: types?.length ? types : undefined,
            tags: tags?.length ? tags : undefined,
        },
    });

    useEffect(() => {
        if (!selectedLocation?.geometry?.viewport) return;
        const viewport = selectedLocation.geometry.viewport;

        const bounds = {
            south: Number(viewport.getSouthWest()?.lat()),
            west: Number(viewport.getSouthWest()?.lng()),
            north: Number(viewport.getNorthEast()?.lat()),
            east: Number(viewport.getNorthEast()?.lng()),
        };

        setBounds(bounds);
        refetch();
    }, [selectedLocation, refetch]);

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

    return {
        date,
        setDate,
        selectedLocation,
        setSelectedLocation,
        bounds,
        setBounds,
        categories,
        setCategories,
        types,
        setTypes,
        tags,
        setTags,
        filteredData,
        error,
        refetch,
        handleDateChange,
        handleCategoriesChange,
        handleTagsChange,
        handleTypesChange,
    };
};

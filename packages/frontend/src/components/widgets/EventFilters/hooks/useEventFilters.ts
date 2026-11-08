'use client';

import { useMemo, useState } from 'react';
import { PlaceType } from '@/components/widgets/MapComponents/types/types';
import { useQuery } from '@apollo/client/react';
import { Event } from '@go-with-me/shared/graphql';
import dayjs from 'dayjs';
import gql from 'graphql-tag';

type Bounds = {
    south: number;
    west: number;
    north: number;
    east: number;
};

const GET_EVENTS_FILTERED = gql`
    query EventFilters(
        $date: String
        $bounds: Bounds
        $categories: [String]
        $types: [String]
        $tags: [String]
    ) {
        eventFilters(
            date: $date
            bounds: $bounds
            categories: $categories
            types: $types
            tags: $tags
        ) {
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
    const [selectedLocation, setSelectedLocation] = useState<PlaceType>(null);
    const bounds = useMemo<Bounds | null>(() => {
        if (!selectedLocation?.viewport) return null;

        const viewport = selectedLocation.viewport;

        return {
            south: Number(viewport.getSouthWest()?.lat()),
            west: Number(viewport.getSouthWest()?.lng()),
            north: Number(viewport.getNorthEast()?.lat()),
            east: Number(viewport.getNorthEast()?.lng()),
        };
    }, [selectedLocation]);
    const [categories, setCategories] = useState<string[] | null>(null);
    const [types, setTypes] = useState<string[] | null>(null);
    const [tags, setTags] = useState<string[] | null>(null);

    const {
        data: filteredData,
        error,
        refetch,
    } = useQuery<{ eventFilters: Event[] }>(GET_EVENTS_FILTERED, {
        skip: !date && !bounds && !categories?.length && !types?.length && !tags?.length,
        variables: {
            date: date || undefined,
            bounds: bounds || undefined,
            categories: categories?.length ? categories : undefined,
            types: types?.length ? types : undefined,
            tags: tags?.length ? tags : undefined,
        },
    });

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

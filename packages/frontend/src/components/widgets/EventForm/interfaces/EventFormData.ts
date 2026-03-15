import { Privacy } from '@/app/graphql/types';

export interface EventFormData {
    _id?: string;
    name: string;
    privacy: Privacy;
    description: string;
    startDate: Date;
    endDate: Date;
    time?: string;
    image?: string;
    location?: Location;
    categories?: string[];
    interests?: string[];
    tags?: string[];
}

export interface EventFormProps {
    eventData?: EventFormData;
}

export type Location = {
    coordinates: [number, number];
    properties?: {
        address?: string;
    };
};

export interface CreateEventVariables {
    createEventInput: {
        name: string;
        privacy: string;
        description: string;
        startDate?: Date;
        endDate?: Date;
        time?: string;
        image?: string;
    };
    createLocationInput?: {
        geometry: { coordinates: number[] };
        properties: { address?: string };
    };
    createCategoryInput?: { categories: string[] };
    createInterestInput?: { interests: string[] };
    createTagInput?: { tags: string[] };
}

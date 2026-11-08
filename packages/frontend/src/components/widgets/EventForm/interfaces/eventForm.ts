import { RefObject } from 'react';
import { LocationType } from '@/components/widgets/MapComponents/types/types';
import type { Event, Privacy } from '@go-with-me/shared/graphql';

export type EventFormData = {
    name: string;
    privacy: Privacy;
    description?: string | null;
    startDate?: string;
    endDate?: string;
    time?: string | null;
    image?: string | null;
    location?: LocationType | null;
    category?: string[];
    interest?: string[];
    tag?: string[];
};

export interface EventFormProps {
    eventData?: Event;
}

export interface UseEventFormProps {
    eventData?: Event;
    submitFileRef: RefObject<(() => Promise<void>) | null>;
    deleteFileRef: RefObject<((url: string) => Promise<void>) | null>;
}

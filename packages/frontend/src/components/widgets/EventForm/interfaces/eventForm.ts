import { RefObject } from 'react';
import type { Event, Privacy } from '@/app/graphql/types';
import { LocationType } from '@/components/widgets/MapComponents/types/types';

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

import { Event } from '@/app/graphql/types';

export interface EventListProps {
    limit?: number;
    offset?: number;
    sort?: string;
}

export interface useEventListProps {
    limit?: number;
    offset?: number;
    sort?: string;
}

export interface GetEventsData {
    events: Event[];
}

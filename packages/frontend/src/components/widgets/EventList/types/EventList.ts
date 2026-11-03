import { Event } from '@/app/graphql/types';
import { SizeCard } from '@/components/widgets/CardEvent/CardEvent';

export interface EventListProps {
    sizeCard: SizeCard;
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

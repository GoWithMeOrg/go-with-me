import { SizeCard } from '@/components/widgets/CardEvent/CardEvent';
import { Event } from '@go-with-me/shared/graphql';

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

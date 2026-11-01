import { IEvent } from '@/app/types/Event';
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
    events: IEvent[];
}

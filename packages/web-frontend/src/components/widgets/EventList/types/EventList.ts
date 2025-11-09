import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { IEvent } from "@/database/models/Event";

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

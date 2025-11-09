import { GET_EVENTS } from "@/app/api/graphql/queries/events";
import { useQuery } from "@apollo/client/react";
import { GetEventsData, useEventListProps } from "@/components/widgets/EventList/types/EventList";
import { IEvent } from "@/database/models/Event";

export const useEventList = ({ limit, offset, sort }: useEventListProps) => {
    const { loading, error, data, refetch } = useQuery<GetEventsData>(GET_EVENTS, {
        variables: {
            limit,
            offset,
            sort,
        },
    });

    const events = data?.events;

    const filterEventsImage: IEvent[] = events
        ? events.filter((event: IEvent) => event.image !== undefined && event.image !== "")
        : [];

    return { loading, error, events, refetch, filterEventsImage };
};

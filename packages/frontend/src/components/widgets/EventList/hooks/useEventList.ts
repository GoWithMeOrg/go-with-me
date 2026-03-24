import { GET_EVENTS } from '@/app/graphql/queries/events';
import { Event } from '@/app/graphql/types';
import { useEventListProps } from '@/components/widgets/EventList/types/EventList';
import { useQuery } from '@apollo/client/react';

export const useEventList = ({ limit, offset, sort }: useEventListProps) => {
    const { loading, error, data, refetch } = useQuery<{ getAllEvents: Event[] }>(GET_EVENTS, {
        variables: {
            limit,
            offset,
            sort,
        },
    });

    const events: Event[] = data?.getAllEvents || [];

    console.log(events);

    const filterEventsImage: Event[] = events.filter(
        (event: Event) => event.image !== undefined && event.image !== ''
    );

    return { loading, error, data, refetch, filterEventsImage };
};

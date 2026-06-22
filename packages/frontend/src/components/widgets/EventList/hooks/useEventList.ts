import { GET_POPULAR_EVENTS } from '@/app/graphql/queries/events';
import { Event } from '@/app/graphql/types';
import { useQuery } from '@apollo/client/react';

export const useEventList = () => {
    const { loading, error, data, refetch } = useQuery(GET_POPULAR_EVENTS);

    const events = data?.getPopularEvents || [];

    console.log(events);

    const filterEventsImage: Event[] = events.filter(
        (event: Event) => event.image !== undefined && event.image !== ''
    );

    return { loading, error, data, refetch, filterEventsImage, events };
};

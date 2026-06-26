import { GET_POPULAR_EVENTS } from '@/app/graphql/queries/events';
import { Event } from '@/app/graphql/types';
import { useQuery } from '@apollo/client/react';
import { useEventListProps } from '../types/EventList';

export const useEventList = ({ limit, offset, sort }: useEventListProps = {}) => {
    const { loading, error, data, refetch } = useQuery(GET_POPULAR_EVENTS, {
        variables: { limit },
    });

    const events = data?.getPopularEvents || [];

    const filterEventsImage: Event[] = events.filter(
        (event: Event) => event.image !== undefined && event.image !== ''
    );

    return { loading, error, data, refetch, filterEventsImage, events };
};

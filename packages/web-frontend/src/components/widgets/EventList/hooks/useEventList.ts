import { GetEventsData, useEventListProps } from '@/components/widgets/EventList/types/EventList';
import { useQuery } from '@apollo/client/react';
import { GET_EVENTS } from '@/app/graphql/queries/events';
import { IEvent } from '@/types';

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
    ? events.filter((event: IEvent) => event.image !== undefined && event.image !== '')
    : [];

  return { loading, error, events, refetch, filterEventsImage };
};

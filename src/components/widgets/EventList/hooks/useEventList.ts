import { GET_EVENTS } from "@/app/api/graphql/queries/events";
import { useQuery } from "@apollo/client";
import { GetEventsData, useEventListProps } from "@/components/widgets/EventList/types/EventList";

export const useEventList = ({ limit, offset, sort }: useEventListProps) => {
    const { loading, error, data, refetch } = useQuery<GetEventsData>(GET_EVENTS, {
        variables: {
            limit,
            offset,
            sort,
        },
    });

    const events = data?.events;

    return { loading, error, events, refetch };
};

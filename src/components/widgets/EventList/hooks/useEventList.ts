import { GET_EVENTS } from "@/app/api/graphql/queries/events";
import { useQuery } from "@apollo/client";

interface useEventListProps {
    limit: number;
    offset: number;
    sort: string;
}
export const useEventList = ({ limit, offset, sort }: useEventListProps) => {
    const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
        variables: {
            limit,
            offset,
            sort,
        },
    });
    return { loading, error, data, refetch };
};

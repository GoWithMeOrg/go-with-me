import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const GET_EVENTS = gql`
    query GetEvents($limit: Int!, $offset: Int!, $sort: String!) {
        events(limit: $limit, offset: $offset, sort: $sort) {
            _id
            organizer {
                _id
            }
            name
            description
            startDate
            time
            location {
                coordinates
            }
            image
        }
    }
`;

export const useEventListHome = () => {
    const { data, error, loading, refetch } = useQuery(GET_EVENTS, {
        variables: {
            limit: 100,
            offset: 9,
            sort: "startDate",
        },
    });

    return { data, error, loading, refetch };
};

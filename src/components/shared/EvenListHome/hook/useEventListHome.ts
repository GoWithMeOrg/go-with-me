import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_EVENTS = gql`
    query GetEvents($limit: Int!, $offset: Int!, $sort: String!) {
        events(limit: $limit, offset: $offset, sort: $sort) {
            _id
            organizer {
                _id
                name
                email
                image
            }

            name
            description
            startDate
            endDate
            time
            location {
                type
                coordinates
                properties {
                    address
                }
            }
            image
        }
    }
`;

export const useEventListHome = () => {
    const { data, error, loading, refetch } = useQuery(GET_EVENTS, {
        variables: {
            limit: 9,
            offset: 9,
            sort: "startDate",
        },
    });

    return { data, error, loading, refetch };
};

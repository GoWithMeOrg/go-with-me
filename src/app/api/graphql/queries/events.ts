import gql from "graphql-tag";

export const GET_EVENTS = gql`
    query GetEvents($limit: Int, $offset: Int, $sort: String) {
        events(limit: $limit, offset: $offset, sort: $sort) {
            _id
            name
            description
            startDate
            time
            location {
                coordinates
                properties {
                    address
                }
            }
            image
        }
    }
`;

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
            organizer {
                image
            }
        }
    }
`;

export const GET_ORGANIZER_EVENTS = gql`
    query allOrganizerEvents($organizerId: String!) {
        allOrganizerEvents(organizer_id: $organizerId) {
            _id
            name
            description
            startDate
            time
            createdAt
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

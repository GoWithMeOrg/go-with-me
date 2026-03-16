import gql from 'graphql-tag';

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
    query GetEventsByOrganizer($organizerId: ID!) {
        getEventsByOrganizer(organizer_id: $organizerId) {
            _id
            category {
                categories
            }
            description
            endDate
            image
            interest {
                interests
            }
            location {
                geometry {
                    coordinates
                }
                properties {
                    address
                }
            }
            name
            organizer {
                _id
                firstName
                image
                lastName
            }
            privacy
            startDate
            tag {
                tags
            }
            time
        }
    }
`;

export const GET_EVENTS_BY_ID = gql`
    query GetEventById($eventId: ID!) {
        getEventById(event_id: $eventId) {
            _id
            category {
                categories
            }
            description
            endDate
            image
            interest {
                interests
            }
            location {
                geometry {
                    coordinates
                }
                properties {
                    address
                }
            }
            name
            privacy
            startDate
            tag {
                tags
            }
            time
            organizer {
                _id
                firstName
                lastName
                image
            }
        }
    }
`;

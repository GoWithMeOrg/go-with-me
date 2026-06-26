import { Event } from '@/app/graphql/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query GetAllEvents($limit: Int, $offset: Int, $sort: String) {
        getAllEvents(limit: $limit, offset: $offset, sort: $sort) {
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
                lastName
                image
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
                _id
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
                lastName
                image
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

export const GET_EVENTS_BY_ORGANIZER = gql`
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

export const GET_POPULAR_EVENTS: TypedDocumentNode<
    { getPopularEvents: Event[] },
    { limit?: number }
> = gql`
    query GetPopularEvents($limit: Int) {
        getPopularEvents(limit: $limit) {
            _id
            description
            image
            startDate
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
                lastName
            }
            time
        }
    }
`;

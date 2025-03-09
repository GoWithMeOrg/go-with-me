import gql from "graphql-tag";

export const JOINED_BY_USER = gql`
    query JoinedByUser($eventId: ID!, $userId: ID!) {
        joinedByUser(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isJoined
            createdAt
            updatedAt
        }
    }
`;

export const JOINED_BY_USERS = gql`
    query JoinedByUsers($eventId: ID) {
        joinedByUsers(event_id: $eventId) {
            _id
            event_id
            user_id
            isJoined
        }
    }
`;

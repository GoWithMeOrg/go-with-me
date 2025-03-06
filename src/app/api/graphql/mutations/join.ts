import gql from "graphql-tag";

export const JOIN_MUTATION = gql`
    mutation Mutation($eventId: ID!, $userId: ID!) {
        joinEvent(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isJoined
            createdAt
            updatedAt
        }
    }
`;

import gql from "graphql-tag";

export const LIKE_MUTATION = gql`
    mutation Mutation($eventId: ID!, $userId: ID!) {
        like(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isLiked
            createdAt
            updatedAt
        }
    }
`;

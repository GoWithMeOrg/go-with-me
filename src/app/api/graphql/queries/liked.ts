import gql from "graphql-tag";

export const LIKED = gql`
    query Liked($eventId: ID, $userId: ID) {
        liked(event_id: $eventId, user_id: $userId) {
            _id
            event_id
            user_id
            isLiked
            createdAt
            updatedAt
        }
    }
`;

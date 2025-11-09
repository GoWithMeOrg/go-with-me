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

export const GET_LIKED_EVENTS = gql`
    query GetLikedEvents($userId: ID!) {
        events: likedEvents(user_id: $userId) {
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

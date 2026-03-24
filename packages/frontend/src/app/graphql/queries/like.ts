import gql from 'graphql-tag';

export const IS_LIKED_BY_USER = gql`
    query IsLikedByUser($ownerId: ID!) {
        isLikedByUser(owner_id: $ownerId)
    }
`;

// export const GET_LIKED_EVENTS = gql`
//     query GetLikedEvents($userId: ID!) {
//         events: likedEvents(user_id: $userId) {
//             _id
//             name
//             description
//             startDate
//             time
//             createdAt
//             location {
//                 type
//                 coordinates
//                 properties {
//                     address
//                 }
//             }
//             image
//         }
//     }
// `;

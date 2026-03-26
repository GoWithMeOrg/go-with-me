import gql from 'graphql-tag';

export const IS_JOINED_BY_USER = gql`
    query isJoinedByUser($ownerId: ID!) {
        isJoinedByUser(owner_id: $ownerId)
    }
`;

export const GET_JOINED_USERS_BY_OWNER_ID = gql`
    query getJoinedUsersByOwnerId($ownerId: ID!) {
        getJoinedUsersByOwnerId(ownerId: $ownerId) {
            _id
            ownerId
            ownerType
            user
        }
    }
`;

// export const GET_JOINED_EVENTS = gql`
//     query GetJoinedEvents($userId: ID!) {
//         events: joinedEvents(user_id: $userId) {
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

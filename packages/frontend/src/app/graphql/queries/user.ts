import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        user(id: $userId) {
            _id
            description
            email
            firstName
            image
            lastName
            roles {
                _id
                name
            }
        }
    }
`;

// export const GET_USERS = gql`
//     query Users {
//         users {
//             _id
//             description
//             email
//             firstName
//             image
//             lastName
//             roles {
//                 _id
//             }
//         }
//     }
// `;

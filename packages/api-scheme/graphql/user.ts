import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            _id
            createdAt
            description
            email
            firstName
            image
            lastName
            location {
                _id
                coordinates
                createdAt
                ownerId
                ownerType
                properties {
                    address
                }
                type
                updatedAt
            }
            roles
            updatedAt
        }
    }
`;

// export const GET_USER_BY_ID = gql`
//   query GetUserById($userId: ID!) {
//     user(id: $userId) {
//       _id
//       name
//       email
//       image
//       location {
//         type
//         coordinates
//         properties {
//           address
//         }
//       }
//       description
//       categories
//       types
//       tags
//       emailVerified
//       createdAt
//       updatedAt
//     }
//   }
// `;

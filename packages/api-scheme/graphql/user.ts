import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
    query UserById($userById: ID!) {
        user(id: $userById) {
            _id
            createdAt
            description
            email
            firstName
            image
            lastName
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

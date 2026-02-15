import gql from 'graphql-tag';

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
                description
                name
                permissions {
                    _id
                    action
                    description
                    name
                    resource {
                        _id
                        name
                        slug
                    }
                }
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

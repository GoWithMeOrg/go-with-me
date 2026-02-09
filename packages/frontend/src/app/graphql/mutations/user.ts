import gql from 'graphql-tag';

export const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: ID!, $user: UpdateUserInput!) {
        updateUser(updateUserId: $updateUserId, user: $user) {
            _id
            firstName
            lastName
            email
            description
            image
            roles {
                _id
                name
                description
            }
        }
    }
`;

export const ADD_USER_ROLE = gql`
    mutation AddUserRole($userId: ID!, $roleName: String!) {
        addUserRole(userId: $userId, roleName: $roleName) {
            _id
            firstName
            lastName
            email
            roles {
                _id
                name
                description
            }
        }
    }
`;

export const REMOVE_USER_ROLE = gql`
    mutation RemoveUserRole($userId: ID!, $roleName: String!) {
        removeUserRole(userId: $userId, roleName: $roleName) {
            _id
            firstName
            lastName
            email
            roles {
                _id
                name
                description
            }
        }
    }
`;

export const REMOVE_USER = gql`
    mutation RemoveUser($id: ID!) {
        removeUser(id: $id)
    }
`;

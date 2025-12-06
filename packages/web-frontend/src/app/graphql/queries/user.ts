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
            roles
            updatedAt
        }
    }
`;

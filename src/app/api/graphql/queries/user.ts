import gql from "graphql-tag";

export const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        user(id: $userId) {
            _id
            name
            firstName
            lastName
            email
            image
            location {
                coordinates
                properties {
                    address
                }
            }
            description
            categories
            types
            tags
        }
    }
`;

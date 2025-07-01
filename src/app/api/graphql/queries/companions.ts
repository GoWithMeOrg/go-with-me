import gql from "graphql-tag";

export const GET_COMPANIONS = gql`
    query Companions($userId: String!, $limit: Int) {
        companions(userId: $userId, limit: $limit) {
            totalCompanions
            companions {
                _id
                name
                image
            }
        }
    }
`;

export const GET_FIND_COMPANION = gql`
    query FindCompanion($userId: ID!, $email: String, $name: String) {
        findCompanion(userId: $userId, email: $email, name: $name) {
            _id
            name
            image
        }
    }
`;

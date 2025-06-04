import gql from "graphql-tag";

export const GET_COMPANIONS = gql`
    query Companions($userId: String!, $limit: Int) {
        companions(userId: $userId, limit: $limit) {
            _id
            name
            image
        }
    }
`;

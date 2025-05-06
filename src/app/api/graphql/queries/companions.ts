import gql from "graphql-tag";

export const GET_COMPANIONS = gql`
    query Companions($userId: ID!) {
        companions(userId: $userId) {
            _id
            name
            image
        }
    }
`;

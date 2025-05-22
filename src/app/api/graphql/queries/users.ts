import gql from "graphql-tag";

export const GET_USERS = gql`
    query Users {
        users {
            _id
            name
            image
        }
    }
`;

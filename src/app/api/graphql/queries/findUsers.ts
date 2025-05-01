import gql from "graphql-tag";

export const GET_FIND_USERS = gql`
    query Query($email: String, $name: String) {
        findUsers(email: $email, name: $name) {
            _id
            name
            image
        }
    }
`;

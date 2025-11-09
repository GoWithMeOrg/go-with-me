import gql from "graphql-tag";

export const GET_FIND_USERS = gql`
    query FindUsers($email: String, $name: String, $user_id: String) {
        findUsers(email: $email, name: $name, user_id: $user_id) {
            _id
            name
            image
        }
    }
`;

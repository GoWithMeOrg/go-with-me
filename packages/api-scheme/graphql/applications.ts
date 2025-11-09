import gql from "graphql-tag";

export const GET_APPLICATIONS = gql`
    query GetApplications($userId: String) {
        getApplications(userId: $userId) {
            id
            receiver {
                _id
                name
            }
            sender {
                _id
                name
                image
            }
            status
        }
    }
`;

export const GET_APPLICATION = gql`
    query GetApplication($user_id: String, $receiver_id: String) {
        getApplication(user_id: $user_id, receiver_id: $receiver_id) {
            receiver {
                name
            }
            sender {
                name
            }
        }
    }
`;

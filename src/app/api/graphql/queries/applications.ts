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

import gql from "graphql-tag";

export const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: ID!, $user: UserInput) {
        updateUser(id: $updateUserId, user: $user) {
            _id
            name
            firstName
            lastName
            email
            image
            location {
                type
                coordinates
                properties {
                    address
                }
            }
            aboutMe
            interests
            meetings
            tags
            emailVerified
        }
    }
`;

import gql from "graphql-tag";

export const GET_INVATIONS = gql`
    query GetInvitation($userId: ID!) {
        getInvitation(userId: $userId) {
            id
            event {
                _id
                name
                time
                startDate
                location {
                    type
                    coordinates
                    properties {
                        address
                    }
                }
                image
                organizer {
                    name
                }
            }
            receivers {
                user {
                    _id
                }
                status
            }
            sender {
                _id
                name
            }
        }
    }
`;

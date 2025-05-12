import gql from "graphql-tag";

export const GET_INVATIONS = gql`
    query GetInvitation($userId: ID!) {
        getInvitation(userId: $userId) {
            id
            createdAt
            invitation {
                event {
                    _id
                    name
                    location {
                        type
                        coordinates
                        properties {
                            address
                        }
                    }
                    image
                    time
                    startDate
                    organizer {
                        name
                        _id
                    }
                }
                id
                sender {
                    _id
                    name
                }
            }
            status
            user {
                _id
            }
        }
    }
`;

export const GET_INVATIONS_WITH_STATUS = gql`
    query GetInvitationsWithStatus($userId: ID!) {
        getInvitation(userId: $userId) {
            myStatus
        }
    }
`;

import gql from "graphql-tag";

export const GET_INVATIONS = gql`
    query GetInvitation($userId: ID!) {
        getInvitation(user_id: $userId) {
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

export const GET_DECLINED_EVENTS = gql`
    query GetDeclinedEvents($userId: ID!) {
        events: getDeclinedEvents(userId: $userId) {
            _id
            name
            description
            startDate
            time
            createdAt
            location {
                type
                coordinates
                properties {
                    address
                }
            }
            image
        }
    }
`;

export const GET_COMPANION_INVITATION_EVENTS = gql`
    query CompanionInvitationEvent($organizerId: String!) {
        companionInvitationEvent(organizer_id: $organizerId) {
            _id
            name
            startDate
        }
    }
`;

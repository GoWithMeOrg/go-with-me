import gql from 'graphql-tag';

export const GET_INVATIONS = gql`
    query GetInvitation($user_id: ID!) {
        getInvitation(user_id: $user_id) {
            _id
            invitation {
                _id
                event {
                    _id
                    name
                    location {
                        type
                        geometry {
                            coordinates
                        }
                        properties {
                            address
                        }
                    }
                    image
                    time
                    startDate
                    organizer {
                        firstName
                        _id
                    }
                }
                sender {
                    _id
                    firstName
                }
            }
            status
            user {
                _id
            }
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
            location {
                type
                geometry {
                    coordinates
                }
                properties {
                    address
                }
            }
            image
        }
    }
`;

export const GET_COMPANION_INVITATION_EVENTS = gql`
    query CompanionInvitationEvent($organizerId: ID!) {
        companionInvitationEvent(organizer_id: $organizerId) {
            _id
            name
            startDate
        }
    }
`;

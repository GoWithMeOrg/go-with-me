import { gql } from '@apollo/client';

export const ADD_MARKED_FOR_WHO_CAN_SEE_EVENTS = gql`
    mutation AddMarkedForWhoCanSeeEvents($companionIds: [ID!]!) {
        addMarkedForWhoCanSeeEvents(companion_ids: $companionIds) {
            _id
            markedForWhoCanSeeEvents
        }
    }
`;

export const REMOVE_MARKED_FOR_WHO_CAN_SEE_EVENTS = gql`
    mutation RemoveMarkedForWhoCanSeeEvents($companionId: ID!) {
        removeMarkedForWhoCanSeeEvents(companion_id: $companionId) {
            _id
            markedForWhoCanSeeEvents
        }
    }
`;

export const ADD_MARKED_FOR_WHO_CAN_INVITE_TO_EVENTS = gql`
    mutation AddMarkedForWhoCanInviteToEvents($companionIds: [ID!]!) {
        addMarkedForWhoCanInviteToEvents(companion_ids: $companionIds) {
            _id
            markedForWhoCanInviteToEvents
        }
    }
`;

export const REMOVE_MARKED_FOR_WHO_CAN_INVITE_TO_EVENTS = gql`
    mutation RemoveMarkedForWhoCanInviteToEvents($companionId: ID!) {
        removeMarkedForWhoCanInviteToEvents(companion_id: $companionId) {
            _id
            markedForWhoCanInviteToEvents
        }
    }
`;

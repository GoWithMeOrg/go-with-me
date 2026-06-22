import { gql } from '@apollo/client';

export const GET_MARKED_FOR_WHO_CAN_SEE_EVENTS = gql`
    query GetMarkedForWhoCanSeeEvents {
        myPrivacySetting {
            _id
            markedForWhoCanSeeEvents
        }
    }
`;

export const GET_MARKED_FOR_WHO_CAN_INVITE_TO_EVENTS = gql`
    query GetMarkedForWhoCanInviteToEvents {
        myPrivacySetting {
            _id
            markedForWhoCanInviteToEvents
        }
    }
`;

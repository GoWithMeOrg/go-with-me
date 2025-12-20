import gql from 'graphql-tag';

export const COMPANION_REQUEST_MUTATION = gql`
    mutation CompanionRequest($senderId: ID!, $receiverId: ID!) {
        companionRequest(sender_id: $senderId, receiver_id: $receiverId) {
            id
            status
        }
    }
`;

export const ACCEPT_COMPANION_MUTATION = gql`
    mutation AcceptCompanionRequest($requestId: ID!) {
        acceptCompanionRequest(request_id: $requestId) {
            id
            status
        }
    }
`;

export const REJECT_COMPANION_MUTATION = gql`
    mutation RejectCompanionRequest($requestId: ID!) {
        rejectCompanionRequest(request_id: $requestId) {
            id
            status
        }
    }
`;

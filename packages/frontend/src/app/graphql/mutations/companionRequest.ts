import gql from 'graphql-tag';

export const SEND_REQUEST_COMPANION_MUTATION = gql`
    mutation SendRequestCompanion($receiver: ID!, $sender: ID!) {
        sendRequestCompanion(receiver: $receiver, sender: $sender) {
            _id
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

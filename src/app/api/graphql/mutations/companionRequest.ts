import gql from "graphql-tag";

export const COMPANION_REQUEST_MUTATION = gql`
    mutation CompanionRequest($senderId: String!, $receiverId: String!) {
        companionRequest(senderId: $senderId, receiverId: $receiverId) {
            id
            receiver {
                _id
            }
            sender {
                _id
            }
            status
        }
    }
`;

export const ACCEPT_COMPANION_MUTATION = gql`
    mutation AcceptCompanionRequest($requestId: String!) {
        acceptCompanionRequest(requestId: $requestId) {
            status
        }
    }
`;

export const REJECT_COMPANION_MUTATION = gql`
    mutation RejectCompanionRequest($requestId: String!) {
        rejectCompanionRequest(requestId: $requestId) {
            id
        }
    }
`;

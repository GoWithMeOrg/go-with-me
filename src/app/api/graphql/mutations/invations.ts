import gql from "graphql-tag";

export const ACCEPT_INVITATION_MUTATION = gql`
    mutation AcceptInvitation($invitationId: ID!, $userId: ID!) {
        acceptInvitation(invitationId: $invitationId, userId: $userId) {
            status
        }
    }
`;

export const DECLINE_INVITATION_MUTATION = gql`
    mutation DeclineInvitation($invitationId: ID!, $userId: ID!) {
        declineInvitation(invitationId: $invitationId, userId: $userId) {
            status
        }
    }
`;

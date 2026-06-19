import gql from 'graphql-tag';

export const SEND_INVITATION_MUTATION = gql`
    mutation SendInvitation($input: SendInvitationInput!) {
        sendInvitation(input: $input) {
            _id
        }
    }
`;

export const ACCEPT_INVITATION_MUTATION = gql`
    mutation AcceptInvitation($invitationId: ID!, $userId: ID!) {
        acceptInvitation(invitationId: $invitationId, userId: $userId) {
            _id
            status
        }
    }
`;

export const DECLINE_INVITATION_MUTATION = gql`
    mutation DeclineInvitation($invitationId: ID!, $userId: ID!) {
        declineInvitation(invitationId: $invitationId, userId: $userId) {
            _id
            status
        }
    }
`;

import gql from 'graphql-tag';

export const SEND_INVITATION_MUTATION = gql`
  mutation SendInvitation($eventId: ID!, $senderId: ID!, $receiverIds: [ID!]!) {
    sendInvitation(event_id: $eventId, sender_id: $senderId, receiver_ids: $receiverIds)
  }
`;

export const ACCEPT_INVITATION_MUTATION = gql`
  mutation AcceptInvitation($invitationId: ID!, $userId: ID!) {
    acceptInvitation(invitation_id: $invitationId, user_id: $userId) {
      id
      status
    }
  }
`;

export const DECLINE_INVITATION_MUTATION = gql`
  mutation DeclineInvitation($invitationId: ID!, $userId: ID!) {
    declineInvitation(invitation_id: $invitationId, user_id: $userId) {
      id
      status
    }
  }
`;

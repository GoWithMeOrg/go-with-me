import gql from 'graphql-tag';

export const COMPANION_REQUEST_MUTATION = gql`
  mutation CompanionRequest($senderId: ID!, $receiverId: ID!) {
    companionRequest(sender_id: $senderId, receiver_id: $receiverId) {
      id
      status
    }
  }
`;

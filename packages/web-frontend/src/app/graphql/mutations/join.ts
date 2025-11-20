import gql from 'graphql-tag';

export const JOIN_MUTATION = gql`
  mutation JoinEvent($eventId: ID!, $userId: ID!) {
    join(event_id: $eventId, user_id: $userId) {
      _id
      event_id
      user_id
      isJoined
    }
  }
`;

import gql from 'graphql-tag';

export const REMOVE_COMPANION_MUTATION = gql`
  mutation RemoveCompanion($userId: ID!, $companionId: ID!) {
    removeCompanion(user_id: $userId, companion_id: $companionId)
  }
`;

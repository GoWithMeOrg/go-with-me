import gql from "graphql-tag";

export const REMOVE_COMPANION_MUTATION = gql`
    mutation RemoveCompanion($userId: ID!, $companionId: ID!) {
        removeCompanion(userId: $userId, companionId: $companionId)
    }
`;

import gql from 'graphql-tag';

export const TOGGLE_JOIN_MUTATION = gql`
    mutation ToggleJoin($ownerId: ID!, $ownerType: String!) {
        toggleJoin(ownerId: $ownerId, ownerType: $ownerType)
    }
`;

import gql from 'graphql-tag';

export const TOGGLE_LIKE_MUTATION = gql`
    mutation ToggleLike($ownerId: ID!, $ownerType: String!) {
        toggleLike(ownerId: $ownerId, ownerType: $ownerType)
    }
`;

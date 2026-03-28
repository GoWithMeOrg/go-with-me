import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_OWNER_ID = gql`
    query GetCommentsByOwnerId($ownerId: ID!) {
        getCommentsByOwnerId(ownerId: $ownerId) {
            _id
            author {
                _id
                image
                firstName
                lastName
            }
            content
            createdAt
        }
    }
`;

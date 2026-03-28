import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
        createComment(createCommentInput: $createCommentInput) {
            _id
            author {
                firstName
                image
                lastName
            }
            content
            createdAt
        }
    }
`;

export const CREATE_REPLY_MUTATION = gql`
    mutation CreateReply($createCommentInput: CreateCommentInput!) {
        createReply(createCommentInput: $createCommentInput) {
            _id
            author {
                firstName
                lastName
                image
            }
            content
        }
    }
`;

export const REMOVE_COMMENT_MUTATION = gql`
    mutation RemoveComment($commentId: ID!) {
        removeComment(commentId: $commentId)
    }
`;

import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
        createComment(createCommentInput: $createCommentInput) {
            _id
            author {
                _id
                firstName
                lastName
                image
            }
            ownerId
            ownerType
            content
            createdAt
            repliesCount
        }
    }
`;

export const CREATE_REPLY_MUTATION = gql`
    mutation CreateReply($createCommentInput: CreateCommentInput!) {
        createReply(createCommentInput: $createCommentInput) {
            _id
            author {
                _id
                firstName
                lastName
                image
            }
            parent {
                _id
                author {
                    firstName
                    lastName
                }
            }
            ownerId
            content
            repliesCount
        }
    }
`;

export const REMOVE_COMMENT_MUTATION = gql`
    mutation RemoveComment($commentId: ID!) {
        removeComment(commentId: $commentId)
    }
`;

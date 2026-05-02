import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_OWNER_ID = gql`
    query GetCommentsByOwnerId($ownerId: ID!, $offset: Int!, $limit: Int!) {
        getCommentsByOwnerId(ownerId: $ownerId, offset: $offset, limit: $limit) {
            _id
            author {
                _id
                image
                firstName
                lastName
            }
            content
            createdAt
            ownerId
            parent {
                _id
                author {
                    firstName
                    lastName
                }
            }
            deleted
        }
    }
`;

export const GET_PARENT_COMMENTS_BY_OWNER_ID = gql`
    query GetParentCommentsByOwnerId($limit: Int, $offset: Int, $ownerId: ID!) {
        getParentCommentsByOwnerId(limit: $limit, offset: $offset, ownerId: $ownerId) {
            _id
            author {
                _id
                firstName
                lastName
                image
            }
            content
            createdAt
            ownerId
            parent {
                _id
            }
            repliesCount
            deleted
        }
    }
`;

export const GET_CHILDREN_COMMENTS_BY_PARENT_ID = gql`
    query GetChildrenCommentsByParentId($limit: Int, $offset: Int, $parentId: ID!) {
        getChildrenCommentsByParentId(limit: $limit, offset: $offset, parentId: $parentId) {
            _id
            author {
                firstName
                lastName
                image
                _id
            }
            content
            createdAt
            ownerId
            parent {
                _id
                author {
                    firstName
                    lastName
                }
            }
            repliesCount
            deleted
        }
    }
`;

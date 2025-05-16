import { gql } from "graphql-tag";

export const commentTypeDefs = gql`
    type Comment {
        _id: ID
        event_id: ID
        author_id: ID
        author: User
        content: String
        createdAt: ISODate
        updatedAt: ISODate
        likes: [ID]
        replies: [Comment]
        replyTo: ReplyToType
        parentId: ID
        replyToList: [ID]
    }

    input CommentInput {
        event_id: ID!
        author_id: ID!
        content: String!
        replyTo: ReplyToInput
        parentId: ID
    }

    type ReplyToType {
        id: ID
        userName: String
    }

    input ReplyToInput {
        id: ID!
        userName: String!
    }

    type Query {
        comments(event_id: ID!, limit: Int): [Comment]
    }

    type Mutation {
        saveComment(comment: CommentInput): Comment
        updateComment(id: ID!, comment: CommentInput): Comment
        deleteComment(commentId: ID!, userId: ID!): String
        likeComment(commentId: ID!, userId: ID!): Comment
    }
`;

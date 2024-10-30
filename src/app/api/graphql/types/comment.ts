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
`;

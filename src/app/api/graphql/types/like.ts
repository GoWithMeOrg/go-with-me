import { gql } from "graphql-tag";

export const likeTypeDefs = gql`
    type Like {
        _id: ID
        event_id: ID
        user_id: ID
        isLiked: Boolean
        createdAt: ISODate
        updatedAt: ISODate
    }
`;

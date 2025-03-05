import { gql } from "graphql-tag";

export const joinedTypeDefs = gql`
    type Joined {
        _id: ID
        event_id: ID
        user_id: ID
        joined: Boolean
        createdAt: ISODate
        updatedAt: ISODate
    }
`;

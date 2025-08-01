import { gql } from "graphql-tag";

export const joinedTypeDefs = gql`
    type Joined {
        _id: ID
        event_id: ID
        user_id: ID
        isJoined: Boolean
        createdAt: ISODate
        updatedAt: ISODate
    }

    type Query {
        joinedByUsers(event_id: ID): [Joined]
        joinedByUser(event_id: ID!, user_id: ID!): Joined
        joinedEvents(user_id: ID!): [Event!]!
    }

    type Mutation {
        joinEvent(event_id: ID!, user_id: ID!): Joined
    }
`;

import { gql } from "graphql-tag";

export const listTypeDefs = gql`
    type Query {
        lists: [List!]!
    }

    type List {
        _id: ID
        author_id: ID
        name: String
        description: String
        users_id: [ID]
    }

    input ListInput {
        author_id: ID!
        name: String!
        description: String
        users_id: [ID]
    }

    input ListInputUpdate {
        name: String
        description: String
        users_id: [ID]
    }
`;

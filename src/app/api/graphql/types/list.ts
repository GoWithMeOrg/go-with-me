import { gql } from "graphql-tag";
import { userTypeDefs } from "./user";
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
        users: [User]
    }

    input ListInput {
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
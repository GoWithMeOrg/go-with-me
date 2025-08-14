import { gql } from "graphql-tag";

export const companionsTypeDefs = gql`
    type Query {
        companions(user_id: String!, limit: Int): Companions!
        findCompanion(user_id: ID!, email: String, name: String): [User!]!
        isUserCompanion(user_id: ID!, companion_id: ID!): Boolean!
    }

    type Companions {
        companions: [User!]!
        totalCompanions: Int
    }
`;

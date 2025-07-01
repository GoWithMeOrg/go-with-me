import { gql } from "graphql-tag";

export const companionsTypeDefs = gql`
    type Query {
        companions(userId: String!, limit: Int): Companions!
        findCompanion(userId: ID!, email: String, name: String): [User!]!
    }

    type Companions {
        companions: [User!]!
        totalCompanions: Int
    }
`;

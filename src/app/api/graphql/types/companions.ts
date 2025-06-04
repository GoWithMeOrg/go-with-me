import { gql } from "graphql-tag";

export const companionsTypeDefs = gql`
    type Query {
        companions(userId: String!, limit: Int): [User!]!
    }

    type Companions {
        _id: ID!
        user_id: ID!
        companions: [User!]!
        updatedAt: String
    }
`;

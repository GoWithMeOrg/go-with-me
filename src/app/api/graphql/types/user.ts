import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        _id: ID!
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: Location
        description: String
        categories: [String]
        types: [String]
        tags: [String]
        emailVerified: Boolean
    }

    input UserInput {
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: LocationInput
        description: String
        categories: [String]
        types: [String]
        tags: [String]
        emailVerified: Boolean
    }

    input LocationInput {
        type: String
        coordinates: [Float]
        properties: PropertiesInput
    }

    input PropertiesInput {
        address: String
    }

    type Query {
        users: [User]
        user(id: ID!): User
        findUsers(email: String, name: String): [User!]!
    }

    type Mutation {
        updateUser(id: ID!, user: UserInput): User
    }
`;
export default userTypeDefs;

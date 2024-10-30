import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        _id: ID
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: String
        aboutMe: String
        interests: [String]
        meetings: [String]
        tags: [String]
        emailVerified: Boolean
    }

    input UserInput {
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: String
        aboutMe: String
        interests: [String]
        meetings: [String]
        tags: [String]
        emailVerified: Boolean
    }
`;

export default userTypeDefs;

import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type User {
        _id: ID
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: Location
        aboutMe: String
        categories: [String]
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
        location: LocationInput
        aboutMe: String
        categories: [String]
        # meetings: [String]
        # tags: [String]
        # emailVerified: Boolean
    }

    input LocationInput {
        type: String
        coordinates: [Float]
        properties: PropertiesInput
    }

    input PropertiesInput {
        address: String
    }
`;

export default userTypeDefs;

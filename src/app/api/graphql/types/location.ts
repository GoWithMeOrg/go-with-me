import { gql } from "graphql-tag";

export const locationTypeDefs = gql`
    type Location {
        type: String
        coordinates: [Float]
        properties: Properties
    }

    input LocationInput {
        type: String
        coordinates: [Float]
        properties: PropertiesInput
    }

    type Properties {
        address: String
    }

    input PropertiesInput {
        address: String
    }
`;

export default locationTypeDefs;

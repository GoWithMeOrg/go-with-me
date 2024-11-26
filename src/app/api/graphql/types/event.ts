import { gql } from "graphql-tag";

export const eventTypeDefs = gql`
    type Query {
        events(limit: Int!, offset: Int, sort: String!): [Event!]!
    }

    type Event {
        _id: ID
        organizer_id: ID
        organizer: User
        name: String
        description: String
        startDate: ISODate
        endDate: ISODate
        time: String
        location: Location
        tags: [String]
        categories: [String]
        types: [String]
        status: String
        image: String
    }

    input EventInput {
        organizer_id: ID!
        name: String
        description: String
        startDate: ISODate
        endDate: ISODate
        time: String
        location: LocationInput
        tags: [String]
        categories: [String]
        types: [String]
        status: String
        image: String
    }
`;

export default eventTypeDefs;

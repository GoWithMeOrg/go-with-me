import { gql } from "graphql-tag";

export const eventTypeDefs = gql`
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

    input Date {
        date: String!
    }

    input Bounds {
        south: Float
        west: Float
        north: Float
        east: Float
    }

    input CategoriesInput {
        categories: [String]
    }

    input TypesInput {
        types: [String]
    }

    input TagsInput {
        tags: [String]
    }

    type Query {
        events: [Event]
        event(id: ID!): Event
        events(limit: Int, offset: Int, sort: String): [Event!]!
        eventSearchByLocation(bounds: Bounds!): [Event]
        eventSearchByCategories(categories: [String]!): [Event!]!
        eventSearchByTypes(types: [String]!): [Event!]!
        eventFilters(date: String, bounds: Bounds, categories: [String], types: [String], tags: [String]): [Event!]!
        allOrganizerEvents(organizer_id: String!): [Event!]!
        search(text: String!): [Event]
        eventsByDate(date: String!): [Event!]!
    }

    type Mutation {
        createEvent(event: EventInput): Event
        updateEvent(id: ID!, event: EventInput): Event
        deleteEvent(id: ID!): Event
    }
`;

export default eventTypeDefs;

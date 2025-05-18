import { gql } from "graphql-tag";

export const tripTypeDefs = gql`
    type Trip {
        _id: ID
        organizer_id: ID
        organizer: User
        name: String
        description: String
        events_id: [ID]
        events: [Event]
        startDate: ISODate
        endDate: ISODate
    }

    input TripInput {
        organizer_id: ID!
        name: String
        description: String
        startDate: ISODate
        endDate: ISODate
        isPrivate: Boolean
        events_id: [ID]
    }

    type Query {
        trips: [Trip]
        trip(id: ID!): Trip
    }

    type Mutation {
        createTrip(trip: TripInput): Trip
        updateTrip(id: ID!, trip: TripInput): Trip
        deleteTrip(id: ID!): Trip
    }
`;

export default tripTypeDefs;

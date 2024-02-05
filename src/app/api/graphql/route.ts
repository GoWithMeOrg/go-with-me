import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import dayjs from "dayjs";

import EventModel, { IEvent } from "@/database/models/Event";
import mongooseConnect from "@/database/mongooseConnect";
import CommentModel, { IComment } from "@/database/models/Comment";
import LocationModel, { ILocation, LocationsRequestField } from "@/database/models/Location";

const resolvers = {
    ISODate: {
        __parseValue(value: string) {
            return new Date(value); // value from the client
        },
        __serialize(value: string) {
            return dayjs(value).toISOString(); // value sent to the client
        },
        __parseLiteral(ast: any) {
            if (ast.kind === "StringValue") {
                return new Date(parseInt(ast.value, 10)); // ast value is always in string format
            }
            return null;
        },
    },

    Query: {
        events: async () => {
            await mongooseConnect();
            return EventModel.find({}).populate("organizer");
        },
        event: async (parent: any, { id, ...rest }: { id: string }) => {
            await mongooseConnect();
            return EventModel.findById(id).populate("organizer");
        },

        comments: async (parent: any, { event_id }: { event_id: string }) => {
            await mongooseConnect();
            return CommentModel.find({ event_id }).sort({ createdAt: -1 }).populate("author");
        },
        locations: async () => {
            await mongooseConnect();
            return LocationModel.find({});
        },
        location: async ({ id }: { id: ILocation["_id"] }) => {
            await mongooseConnect();
            return LocationModel.findById({ id });
        },
    },

    Mutation: {
        createEvent: async (parent: any, { event }: { event: IEvent }) => {
            await mongooseConnect();
            const newEvent = new EventModel(event);
            return await newEvent.save();
        },
        updateEvent: async (parent: any, { id, event }: { id: string; event: IEvent }) => {
            await mongooseConnect();
            await EventModel.updateOne({ _id: id }, event);
            return await EventModel.findById(id).populate("organizer");
        },
        deleteEvent: async (parent: any, { id }: { id: string }) => {
            await mongooseConnect();
            return await EventModel.deleteOne({ _id: id });
        },

        saveComment: async (parent: any, { comment }: { comment: IComment }) => {
            await mongooseConnect();
            const newComment = new CommentModel(comment);
            return await newComment.save();
        },
        createLocation: async (location: Pick<ILocation, "name" | "address" | "coordinates" | "author_id">) => {
            await mongooseConnect();
            const newLocation = new LocationModel(location);
            return await newLocation.save();
        },
        updateLocation: async ({ id, location }: { id: ILocation["_id"]; location: Omit<ILocation, "_id"> }) => {
            await mongooseConnect();
            await LocationModel.updateOne({ _id: id }, location);
        },
        deleteLocation: async ({ id }: { id: ILocation["_id"] }) => {
            await mongooseConnect();
            return await LocationModel.deleteOne({ _id: id });
        },
    },
};

const typeDefs = gql`
    #graphql

    # Custom scalar type for Date
    scalar ISODate

    type Query {
        hello: String
        events: [Event]
        event(id: ID!): Event
        trips: [Trip]
        trip(id: ID!): Trip
        comments(event_id: ID!): [Comment]
        locations: [Location]
        location(id: ID!): Location
    }

    type User {
        _id: ID
        name: String
        email: String
        image: String
        emailVerified: Boolean
    }

    type Location {
        _id: ID
        author_id: ID
        author: User
        trip_id: ID
        content: String
        name: String
        address: String
        coordinates: Coordinates
        description: String
    }

    type Coordinates {
        latitude: Float
        longitude: Float
    }

    type Event {
        _id: ID
        organizer_id: ID
        organizer: [User]
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: ISODate
        endDate: ISODate
        locationName: String
    }

    type Trip {
        _id: ID
        organizer: User
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: ISODate
        endDate: ISODate
        location: [Location]
    }

    type Comment {
        _id: ID
        event_id: ID
        author_id: ID
        author: User
        content: String
        createdAt: ISODate
        updatedAt: ISODate
    }

    input CommentInput {
        event_id: ID!
        author_id: ID!
        content: String
    }

    input EventInput {
        organizer_id: ID!
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: ISODate
        endDate: ISODate
        location: String
    }

    input LocationInput {
        author_id: ID!
        name: String
        address: String
        latitude: Float
        longitude: Float
    }

    type Mutation {
        createEvent(event: EventInput): Event
        updateEvent(id: ID!, event: EventInput): Event
        deleteEvent(id: ID!): Event

        saveComment(comment: CommentInput): Comment

        createLocation(location: LocationInput): Location
        updateLocation(id: ID!, location: LocationInput): Location
        deleteLocation(id: ID!): Location
    }
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
    // Похоже, что в @as-integrations/next типы не совсем корректные
    // @ts-ignore
    context: async (nextApiRequest) => {
        await mongooseConnect();
        return { req: { cookies: nextApiRequest.cookies._parsed } };
    },
});

export { handler as GET, handler as POST };

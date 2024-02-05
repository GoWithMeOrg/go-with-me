import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import dayjs from "dayjs";

import EventModel, { IEvent } from "@/database/models/Event";
import mongooseConnect from "@/database/mongooseConnect";
import CommentModel, { IComment } from "@/database/models/Comment";
import TripModel, { ITrip } from "@/database/models/Trip";

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

        trips: async () => {
            await mongooseConnect();
            return TripModel.find({}).populate("organizer");
        },
        trip: async (parent: any, { id, ...rest }: { id: string }) => {
            await mongooseConnect();
            return TripModel.findById(id).populate("organizer");
        },

        comments: async (parent: any, { event_id }: { event_id: string }) => {
            await mongooseConnect();
            return CommentModel.find({ event_id }).sort({ createdAt: -1 }).populate("author");
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

        createTrip: async (parent: any, { trip }: { trip: ITrip }) => {
            await mongooseConnect();
            const newTrip = new TripModel(trip);
            return await newTrip.save();
        },

        updateTrip: async (parent: any, { id, trip }: { id: string; trip: ITrip }) => {
            await mongooseConnect();
            await TripModel.updateOne({ _id: id }, trip);
            return await TripModel.findById(id);
        },

        deleteTrip: async (parent: any, { id }: { id: string }) => {
            await mongooseConnect();
            return await TripModel.deleteOne({ _id: id });
        },

        saveComment: async (parent: any, { comment }: { comment: IComment }) => {
            await mongooseConnect();
            const newComment = new CommentModel(comment);
            return await newComment.save();
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
    }

    type User {
        _id: ID
        name: String
        email: String
        image: String
        emailVerified: Boolean
    }

    type Location {
        name: String
    }

    type Event {
        _id: ID
        organizer_id: ID
        organizer: User
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: ISODate
        endDate: ISODate
        locationName: String
    }

    type Trip {
        _id: ID
        organizer_id: ID
        organizer: User
        tripName: String
        description: String
        events_id: [ID!]
        startDate: ISODate
        endDate: ISODate
    }

    input TripInput {
        organizer_id: ID!
        tripName: String
        description: String
        startDate: ISODate
        endDate: ISODate
        isPrivate: Boolean
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
        name: String
    }

    type Mutation {
        createEvent(event: EventInput): Event
        updateEvent(id: ID!, event: EventInput): Event
        deleteEvent(id: ID!): Event

        createTrip(trip: TripInput): Trip
        updateTrip(id: ID!, trip: TripInput): Trip
        deleteTrip(id: ID!): Trip

        saveComment(comment: CommentInput): Comment
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

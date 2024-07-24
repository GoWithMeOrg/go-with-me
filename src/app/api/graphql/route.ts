import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import dayjs from "dayjs";

import EventModel, { IEvent } from "@/database/models/Event";
import mongooseConnect from "@/database/mongooseConnect";
import CommentModel, { IComment } from "@/database/models/Comment";
import TripModel, { ITrip } from "@/database/models/Trip";
import UserModel from "@/database/models/User";

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
            return EventModel.find({});
        },
        event: async (parent: any, { id, ...rest }: { id: string }) => {
            return EventModel.findById(id);
        },

        trips: async () => {
            return TripModel.find({});
        },
        trip: async (parent: any, { id, ...rest }: { id: string }) => {
            return TripModel.findById(id);
        },

        comments: async (parent: any, { event_id }: { event_id: string }) => {
            return CommentModel.find({ event_id }).sort({ createdAt: -1 }).populate("author");
        },

        search: async (parent: any, { text }: { text: string }) => {
            const events = await EventModel.find({ $text: { $search: text } });
            return [...events];
        },
    },

    Event: {
        organizer: async (parent: IEvent) => {
            return await UserModel.findById(parent.organizer_id);
        },
    },

    Trip: {
        events: async (parent: ITrip) => {
            return await EventModel.find({ _id: { $in: parent.events_id } });
        },
        organizer: async (parent: ITrip) => {
            return await UserModel.findById(parent.organizer_id);
        },
    },

    Comment: {
        author: async (parent: IComment) => {
            return await UserModel.findById(parent.author_id);
        },
    },

    Mutation: {
        createEvent: async (parent: any, { event }: { event: IEvent }) => {
            const newEvent = new EventModel(event);
            return await newEvent.save();
        },
        updateEvent: async (parent: any, { id, event }: { id: string; event: IEvent }) => {
            await EventModel.updateOne({ _id: id }, event);
            return await EventModel.findById(id).populate("organizer");
        },
        deleteEvent: async (parent: any, { id }: { id: string }) => {
            return await EventModel.deleteOne({ _id: id });
        },

        createTrip: async (parent: any, { trip }: { trip: ITrip }) => {
            const newTrip = new TripModel(trip);
            return await newTrip.save();
        },
        updateTrip: async (parent: any, { id, trip }: { id: string; trip: ITrip }) => {
            await TripModel.updateOne({ _id: id }, trip);
            return await TripModel.findById(id);
        },
        deleteTrip: async (parent: any, { id }: { id: string }) => {
            return await TripModel.deleteOne({ _id: id });
        },

        saveComment: async (parent: any, { comment }: { comment: IComment }) => {
            const newComment = new CommentModel(comment);
            return await newComment.save();
        },
    },
};

const typeDefs = gql`
    scalar ISODate

    type Query {
        hello: String
        events: [Event]
        event(id: ID!): Event
        trips: [Trip]
        trip(id: ID!): Trip
        comments(event_id: ID!): [Comment]
        search(text: String!): [Event]
    }

    type User {
        _id: ID
        name: String
        email: String
        image: String
        emailVerified: Boolean
    }

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

    type Comment {
        _id: ID
        event_id: ID
        author_id: ID
        author: User
        content: String
        createdAt: ISODate
        updatedAt: ISODate
        likes: Int
        replyToId: [String]
        replies: [Comment]
    }

    input CommentInput {
        event_id: ID!
        author_id: ID!
        content: String
        likes: Int
        replyToId: [String]
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
        // Этот вызов будет выполняться перед любым запросом
        await mongooseConnect();
        return { req: { cookies: nextApiRequest.cookies._parsed } };
    },
});

export { handler as GET, handler as POST };

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

import EventModel, { IEvent } from "@/database/models/Event";
import mongooseConnect from "@/database/mongooseConnect";

const resolvers = {
    Query: {
        hello: () => "world",
        events: async () => {
            await mongooseConnect();
            const result = await EventModel.find({ isPrivate: false }).populate("organizer");
            console.log("result: ", result); // eslint-disable-line
            return result;
        },
        event: async (parent: any, { id, ...rest }: { id: string }) => {
            console.log("rest: ", rest); // eslint-disable-line
            await mongooseConnect();
            return await EventModel.findById(id);
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
            return await EventModel.findById(id);
        },
        deleteEvent: async (parent: any, { id }: { id: string }) => {
            await mongooseConnect();
            return await EventModel.deleteOne({ _id: id });
        },
    },
};

const typeDefs = gql`
    #graphql
    type Query {
        hello: String
        events: [Event]
        event(id: ID!): Event
    }

    type User {
        _id: ID
        name: String
        email: String
        image: String
        emailVerified: Boolean
    }

    type Event {
        _id: ID
        organizer: User
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: String
        endDate: String
    }

    input EventInput {
        organizerId: ID!
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: String
        endDate: String
    }

    type Mutation {
        createEvent(event: EventInput): Event
        updateEvent(id: ID!, event: EventInput): Event
        deleteEvent(id: ID!): Event
    }
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };

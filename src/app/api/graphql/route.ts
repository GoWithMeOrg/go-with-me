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
            return await EventModel.find();
        },
        event: async (id: string) => {
            console.log("id: ", id); // eslint-disable-line
            await mongooseConnect();
            return await EventModel.findById(id);
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

    type Event {
        _id: ID
        organizerId: ID
        tripName: String
        description: String
        isPrivate: Boolean
        startDate: String
        endDate: String
    }
`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };

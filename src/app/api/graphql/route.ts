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
    },
};

const typeDefs = gql`
    type Query {
        hello: String
        events: [Event]
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

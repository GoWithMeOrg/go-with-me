import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import mongooseConnect from "@/database/mongooseConnect";
import { getUserFromRequest } from "@/utils/getUserFromRequest";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

export const server = new ApolloServer({
    resolvers,
    typeDefs,
});

export const handler = startServerAndCreateNextHandler(server, {
    // @ts-ignore-next-line
    context: async (nextRequest: NextRequest) => {
        await mongooseConnect();
        const currentUser = await getUserFromRequest(nextRequest);
        return { nextRequest, currentUser };
    },
});

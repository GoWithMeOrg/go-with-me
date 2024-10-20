import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import mongooseConnect from "@/database/mongooseConnect";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

export const server = new ApolloServer({
    resolvers,
    typeDefs,
});

export const handler = startServerAndCreateNextHandler(server, {
    // Похоже, что в @as-integrations/next типы не совсем корректные
    // @ts-ignore
    context: async (nextApiRequest) => {
        // Этот вызов будет выполняться перед любым запросом
        await mongooseConnect();
        return { req: { cookies: nextApiRequest.cookies._parsed } };
    },
});

import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import mongooseConnect from "@/database/mongooseConnect";
import { getUserFromRequest } from "@/utils/getUserFromRequest";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
    // @ts-ignore-next-line
    context: async (nextRequest: NextRequest) => {
        await mongooseConnect();
        const currentUser = await getUserFromRequest(nextRequest);
        return { nextRequest, currentUser };
    },
});

export async function GET(req: NextRequest) {
    return handler(req);
}

export async function POST(req: NextRequest) {
    return handler(req);
}

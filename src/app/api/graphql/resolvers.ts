import { mergeResolvers } from "@graphql-tools/merge";

import { isoDateResolvers } from "./resolvers/isodate";
import { userResolvers } from "./resolvers/user";
import { eventResolvers } from "./resolvers/event";
import { tripResolvers } from "./resolvers/trip";
import { commentResolvers } from "./resolvers/comment";

export const resolvers = mergeResolvers([
    isoDateResolvers,
    userResolvers,
    eventResolvers,
    tripResolvers,
    commentResolvers,
]);

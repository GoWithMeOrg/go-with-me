import { mergeResolvers } from "@graphql-tools/merge";

import { isoDateResolvers } from "./resolvers/isodate";
import { userResolvers } from "./resolvers/user";
import { eventResolvers } from "./resolvers/event";
import { tripResolvers } from "./resolvers/trip";
import { commentResolvers } from "./resolvers/comment";
import { listResolvers } from "./resolvers/list";

export const resolvers = mergeResolvers([
    isoDateResolvers,
    userResolvers,
    eventResolvers,
    tripResolvers,
    commentResolvers,
    listResolvers,
]);

import { mergeResolvers } from "@graphql-tools/merge";

import { isoDateResolvers } from "./resolvers/isodate";
import { userResolvers } from "./resolvers/user";
import { eventResolvers } from "./resolvers/event";
import { tripResolvers } from "./resolvers/trip";
import { commentResolvers } from "./resolvers/comment";
import { listResolvers } from "./resolvers/list";
import { joinedResolvers } from "./resolvers/joined";
import { likedResolvers } from "./resolvers/like";
import { companionRequestResolvers } from "./resolvers/companionRequest";
import { companionsResolvers } from "./resolvers/companions";
import { invitationResolvers } from "./resolvers/invitation";
import { roleResolvers } from "./resolvers/role";

export const resolvers = mergeResolvers([
    isoDateResolvers,
    userResolvers,
    eventResolvers,
    tripResolvers,
    commentResolvers,
    listResolvers,
    joinedResolvers,
    likedResolvers,
    companionRequestResolvers,
    companionsResolvers,
    invitationResolvers,
    roleResolvers,
]);

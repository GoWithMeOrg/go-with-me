import { gql } from "graphql-tag";
import { userTypeDefs } from "./types/user";
import { eventTypeDefs } from "./types/event";
import { tripTypeDefs } from "./types/trip";
import { commentTypeDefs } from "./types/comment";
import { locationTypeDefs } from "./types/location";
import { listTypeDefs } from "./types/list";
import { joinedTypeDefs } from "./types/joined";
import { likeTypeDefs } from "./types/like";
import companionRequest from "./types/companionRequest";
import { companionsTypeDefs } from "./types/companions";
import { invitationTypeDefs } from "./types/invitation";
import { roleTypeDefs } from "./types/role";

export const rootTypeDefs = gql`
    scalar ISODate
`;

export const typeDefs = [
    rootTypeDefs,
    userTypeDefs,
    eventTypeDefs,
    tripTypeDefs,
    commentTypeDefs,
    locationTypeDefs,
    listTypeDefs,
    joinedTypeDefs,
    likeTypeDefs,
    companionRequest,
    companionsTypeDefs,
    invitationTypeDefs,
    roleTypeDefs,
];

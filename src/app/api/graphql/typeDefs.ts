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

export const rootTypeDefs = gql`
    scalar ISODate

    type Query {
        users: [User]
        user(id: ID!): User

        events: [Event]
        event(id: ID!): Event

        trips: [Trip]
        trip(id: ID!): Trip

        comments(event_id: ID!, limit: Int): [Comment]

        search(text: String!): [Event]

        eventsByDate(date: String!): [Event!]!

        lists: [List]
        listItem(id: ID!): List

        joinedByUsers(event_id: ID): [Joined]
        joinedByUser(event_id: ID!, user_id: ID!): Joined

        liked(event_id: ID, user_id: ID): Like

        findUsers(email: String, name: String): [User!]!

        getApplications(userId: String): [CompanionRequest!]!

        companions(userId: ID!): [User!]!

        getInvitation(id: ID!): Invitation
        getInvitationsByEvent(eventId: ID!): [Invitation!]!
    }

    type Mutation {
        updateUser(id: ID!, user: UserInput): User

        createEvent(event: EventInput): Event
        updateEvent(id: ID!, event: EventInput): Event
        deleteEvent(id: ID!): Event

        createTrip(trip: TripInput): Trip
        updateTrip(id: ID!, trip: TripInput): Trip
        deleteTrip(id: ID!): Trip

        saveComment(comment: CommentInput): Comment
        updateComment(id: ID!, comment: CommentInput): Comment
        deleteComment(commentId: ID!, userId: ID!): String
        likeComment(commentId: ID!, userId: ID!): Comment

        createList(list: ListInput): List
        updateList(id: ID!, list: ListInputUpdate): List
        deleteList(id: ID!): List

        joinEvent(event_id: ID!, user_id: ID!): Joined

        like(event_id: ID!, user_id: ID!): Like

        companionRequest(senderId: String!, receiverId: String!): CompanionRequest!
        acceptCompanionRequest(requestId: String!): CompanionRequest!
        rejectCompanionRequest(requestId: String!): CompanionRequest!
        removeCompanion(userId: ID!, companionId: ID!): Boolean

        respondToInvitation(eventId: ID!, senderId: ID!, receiverIds: [ID!]!): Invitation!
    }
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
];

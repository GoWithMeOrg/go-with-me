import gql from "graphql-tag";

export const invitationTypeDefs = gql`
    enum InvitationResponseStatus {
        Invited
        Accepted
        Declined
    }

    type Invited {
        id: ID!
        user: User!
        invitation: Invitation! # ссылка обратно на инвайт (удобно для мутаций)
        status: InvitationResponseStatus!
        respondedAt: String
        createdAt: String
        updatedAt: String
    }

    type Invitation {
        id: ID!
        event: Event!
        sender: User!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getInvitation(user_id: ID!): [Invited!]!
        getInvitationsByEvent(eventId: ID!): [Invitation!]!
        getDeclinedEvents(userId: ID!): [Event!]!
    }

    type Mutation {
        respondToInvitation(eventId: ID!, senderId: ID!, receiverIds: [ID!]!): Invitation!
        acceptInvitation(invitationId: ID!, userId: ID!): Invited!
        declineInvitation(invitationId: ID!, userId: ID!): Invited!
    }
`;

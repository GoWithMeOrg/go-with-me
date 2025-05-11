import gql from "graphql-tag";

export const invitationTypeDefs = gql`
    enum InvitationResponseStatus {
        Invited
        Accepted
        Declined
    }

    type InvitationReceiver {
        user: User!
        status: InvitationResponseStatus!
        respondedAt: String
    }

    type Invitation {
        id: ID!
        event: Event!
        sender: User!
        receivers: [InvitationReceiver!]!
        createdAt: String
        updatedAt: String
    }
`;

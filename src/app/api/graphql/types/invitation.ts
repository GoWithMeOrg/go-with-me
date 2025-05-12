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
`;

import { gql } from "graphql-tag";

export const companionRequestTypeDefs = gql`
    enum FriendRequestStatus {
        pending
        accepted
        rejected
        blocked
    }

    type CompanionRequest {
        id: ID!
        sender: User!
        receiver: User!
        status: FriendRequestStatus!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        getApplications(userId: String): [CompanionRequest!]!
        getApplication(user_id: String, receiver_id: String): CompanionRequest!
    }

    type Mutation {
        companionRequest(senderId: String!, receiverId: String!): CompanionRequest!
        acceptCompanionRequest(requestId: String!): CompanionRequest!
        rejectCompanionRequest(requestId: String!): CompanionRequest!
        removeCompanion(userId: ID!, companionId: ID!): Boolean
    }
`;

export default companionRequestTypeDefs;

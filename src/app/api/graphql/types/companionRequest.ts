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
`;
export default companionRequestTypeDefs;

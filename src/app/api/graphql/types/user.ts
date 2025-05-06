import { gql } from "graphql-tag";

export const userTypeDefs = gql`
    type Query {
        findUsers(email: String, name: String): [User!]!
        getApplications(userId: String): [CompanionRequest]
    }

    type Mutation {
        companionRequest(senderId: String!, receiverId: String!): CompanionRequest!
        acceptFriendRequest(requestId: String!): CompanionRequest!
        rejectFriendRequest(requestId: String!): CompanionRequest!
    }

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

    type User {
        _id: ID!
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: Location
        description: String
        categories: [String]
        types: [String]
        tags: [String]
        emailVerified: Boolean
    }

    input UserInput {
        name: String
        firstName: String
        lastName: String
        email: String
        image: String
        location: LocationInput
        description: String
        categories: [String]
        types: [String]
        tags: [String]
        emailVerified: Boolean
    }

    input LocationInput {
        type: String
        coordinates: [Float]
        properties: PropertiesInput
    }

    input PropertiesInput {
        address: String
    }
`;
export default userTypeDefs;

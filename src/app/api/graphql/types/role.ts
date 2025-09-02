import { gql } from "graphql-tag";

export const roleTypeDefs = gql`
    type Role {
        _id: ID!
        name: String!
        permissions: [Permission!]!
    }

    type Permission {
        actions: [Action!]!
        resource: Resource!
    }

    enum Action {
        READ
        CREATE
        EDIT
        DELETE
    }

    enum Resource {
        EVENT
        TRIP
        COMMENT
        USER
        ROLE
    }

    input RoleInput {
        name: String!
        permissions: [PermissionInput!]!
    }

    input PermissionInput {
        actions: [Action!]!
        resource: Resource!
    }

    type Query {
        roles: [Role!]!
        role(id: ID!): Role
    }

    type Mutation {
        createRole(role: RoleInput!): Role!
        updateRole(id: ID!, role: RoleInput!): Role!
        deleteRole(id: ID!): Boolean!
    }
`;

export default roleTypeDefs;

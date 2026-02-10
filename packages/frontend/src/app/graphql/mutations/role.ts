import { gql } from '@apollo/client';

export const CREATE_ROLE = gql`
    mutation CreateRole($createRoleInput: CreateRoleInput!) {
        createRole(createRoleInput: $createRoleInput) {
            _id
            name
            permissions {
                _id
                name
                action
            }
        }
    }
`;

export const UPDATE_ROLE = gql`
    mutation updateRole($updateRoleInput: UpdateRoleInput!) {
        updateRole(updateRoleInput: $updateRoleInput) {
            _id
            description
            name
            permissions {
                _id
                action
                description
                name
                resource {
                    _id
                    name
                    slug
                }
            }
        }
    }
`;

export const REMOVE_ROLE = gql`
    mutation RemoveRole($removeRoleId: ID!) {
        removeRole(id: $removeRoleId)
    }
`;

export const ADD_PERMISSION_TO_ROLE = gql`
    mutation AddPermissionToRole($permissionId: [ID!]!, $roleId: ID!) {
        addPermissionToRole(permissionId: $permissionId, roleId: $roleId) {
            _id
            description
            name
            permissions {
                _id
            }
        }
    }
`;

export const REMOVE_PERMISSION_FROM_ROLE = gql`
    mutation RemovePermissionFromRole($permissionId: ID!, $roleId: ID!) {
        removePermissionFromRole(permissionId: $permissionId, roleId: $roleId) {
            name
            _id
            description
            permissions {
                name
                _id
            }
        }
    }
`;

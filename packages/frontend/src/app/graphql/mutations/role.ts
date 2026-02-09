import { gql } from '@apollo/client';

export const CREATE_ROLE = gql`
    mutation CreateRole($createRoleInput: CreateRoleInput!) {
        createRole(createRoleInput: $createRoleInput) {
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

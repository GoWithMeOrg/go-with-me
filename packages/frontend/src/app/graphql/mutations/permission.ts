import { gql } from '@apollo/client';

export const CREATE_RESOURCE_PERMISSION = gql`
    mutation CreateResourcePermissions($resourceId: ID!) {
        createResourcePermissions(resourceId: $resourceId) {
            _id
            action
            isActive
            name
        }
    }
`;

export const TOGGLE_PERMISSION_STATUS = gql`
    mutation TogglePermissionStatus($togglePermissionStatusId: ID!) {
        togglePermissionStatus(id: $togglePermissionStatusId) {
            _id
            name
            isActive
        }
    }
`;

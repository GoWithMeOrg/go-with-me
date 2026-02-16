import { gql } from '@apollo/client';

export const GET_ROLES = gql`
    query GetRoles {
        roles {
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

export const GET_ROLES_BY_USER_ID = gql`
    query RoleByUserId($userId: ID!) {
        roleByUserId(userId: $userId) {
            roles {
                name
            }
        }
    }
`;

export const GET_ROLES_BY_NAME = gql`
    query RoleByName($name: String!) {
        roleByName(name: $name) {
            _id
            name
        }
    }
`;

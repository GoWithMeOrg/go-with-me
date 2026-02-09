import { gql } from 'graphql-tag';

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

import gql from 'graphql-tag';

export const GET_PERMISSIONS = gql`
    query Permissions {
        permissions {
            _id
            action
            description
            name
            isActive
            resource {
                _id
                name
                slug
            }
        }
    }
`;

import gql from 'graphql-tag';

export const GET_ALL_PERMISSIONS = gql`
    query Permissions {
        permissions {
            _id
            action
            description
            isActive
            name
            resource {
                name
            }
        }
    }
`;

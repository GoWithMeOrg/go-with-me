import { gql } from '@apollo/client';

export const GET_RESOURCES = gql`
    query Resources {
        resources {
            _id
            name
            permissions {
                _id
                action
                description
                isActive
                name
            }
        }
    }
`;

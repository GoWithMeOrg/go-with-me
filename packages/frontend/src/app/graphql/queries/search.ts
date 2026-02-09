import { gql } from '@apollo/client';

export const SEARCH_RESOURCES = gql`
    query SearchResources($query: String) {
        searchResources(query: $query) {
            _id
            name
            slug
            permissions {
                _id
                action
                name
                description
                isActive
            }
        }
    }
`;

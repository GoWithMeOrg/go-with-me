import gql from 'graphql-tag';

export const GET_LOCATION_BY_ID = gql`
    query LocationById($locationById: ID!) {
        locationById(id: $locationById) {
            _id
            geometry {
                coordinates
                type
            }
            properties {
                address
                createdAt
                ownerId
                ownerType
                updatedAt
            }
            type
        }
    }
`;

export const GET_LOCATION_BY_OWNER_ID = gql`
    query LocationByOwnerId($ownerId: ID!) {
        locationByOwnerId(ownerId: $ownerId) {
            _id
            geometry {
                coordinates
                type
            }
            properties {
                address
                createdAt
                ownerId
                ownerType
                updatedAt
            }
            type
        }
    }
`;

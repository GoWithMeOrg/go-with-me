import gql from 'graphql-tag';

export const GET_LOCATION_BY_ID = gql`
    query LocationById($locationByIdId: ID!) {
        locationById(id: $locationByIdId) {
            _id
            coordinates
            ownerId
            ownerType
            properties {
                address
            }
            type
        }
    }
`;

export const GET_LOCATION_BY_OWNER_ID = gql`
    query LocationByOwnerId($ownerId: ID!) {
        locationByOwnerId(ownerId: $ownerId) {
            _id
            coordinates
            properties {
                address
            }
            type
            ownerId
            ownerType
        }
    }
`;

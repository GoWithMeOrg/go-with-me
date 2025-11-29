import gql from 'graphql-tag';

export const GET_USER_PROFILE_BY_ID = gql`
    query UserProfile($userId: ID!) {
        userProfile(userId: $userId) {
            location {
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
            user {
                _id
                createdAt
                description
                email
                firstName
                image
                lastName
                roles
                updatedAt
            }
        }
    }
`;

import gql from 'graphql-tag';

export const GET_USER_PROFILE_BY_ID = gql`
    query UserProfile($userId: ID!) {
        userProfile(userId: $userId) {
            categories {
                _id
                categories
            }
            interest {
                _id
                interest
            }
            location {
                _id
                geometry {
                    coordinates
                }
                properties {
                    address
                }
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
            }
        }
    }
`;

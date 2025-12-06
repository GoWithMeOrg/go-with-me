import gql from 'graphql-tag';

export const GET_USER_PROFILE_BY_ID = gql`
    query UserProfile($userId: ID!) {
        userProfile(userId: $userId) {
            tag {
                tags
                _id
            }
            category {
                _id
                categories
            }
            interest {
                _id
                interests
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

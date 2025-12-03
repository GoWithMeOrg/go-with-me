import gql from 'graphql-tag';

export const UPDATE_USER_PROFILE = gql`
    mutation UpdateUserProfile(
        $updateInterestInput: UpdateInterestInput!
        $updateLocationInput: UpdateLocationInput!
        $updateUserInput: UpdateUserInput!
        $userId: ID!
        $interestId: ID!
        $locationId: ID!
    ) {
        updateUserProfile(
            updateInterestInput: $updateInterestInput
            updateLocationInput: $updateLocationInput
            updateUserInput: $updateUserInput
            userId: $userId
            interestId: $interestId
            locationId: $locationId
        ) {
            interest {
                interest
            }
            location {
                geometry {
                    coordinates
                }
                properties {
                    address
                }
            }
            user {
                _id
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

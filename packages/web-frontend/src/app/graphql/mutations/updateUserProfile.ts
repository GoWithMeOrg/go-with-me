import gql from 'graphql-tag';

export const UPDATE_USER_PROFILE = gql`
    mutation UpdateUserProfile(
        $userId: ID!
        $categoriesId: ID
        $createCategoriesInput: CreateCategoriesInput
        $updateUserInput: UpdateUserInput
        $createInterestInput: CreateInterestInput
        $createLocationInput: CreateLocationInput
        $interestId: ID
        $locationId: ID
        $updateCategoriesInput: UpdateCategoriesInput
        $updateInterestInput: UpdateInterestInput
        $updateLocationInput: UpdateLocationInput
    ) {
        updateUserProfile(
            userId: $userId
            categoriesId: $categoriesId
            createCategoriesInput: $createCategoriesInput
            updateUserInput: $updateUserInput
            createInterestInput: $createInterestInput
            createLocationInput: $createLocationInput
            interestId: $interestId
            locationId: $locationId
            updateCategoriesInput: $updateCategoriesInput
            updateInterestInput: $updateInterestInput
            updateLocationInput: $updateLocationInput
        ) {
            categories {
                _id
                categories
                ownerId
                ownerType
            }
            interest {
                _id
                interest
                ownerId
                ownerType
            }
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
    # mutation UpdateUserProfile(
    #     $categoriesId: ID
    #     $interestId: ID
    #     $locationId: ID
    #     $updateCategoriesInput: UpdateCategoriesInput
    #     $updateInterestInput: UpdateInterestInput
    #     $updateLocationInput: UpdateLocationInput
    #     $updateUserInput: UpdateUserInput
    #     $userId: ID!
    # ) {
    #     updateUserProfile(
    #         categoriesId: $categoriesId
    #         interestId: $interestId
    #         locationId: $locationId
    #         updateCategoriesInput: $updateCategoriesInput
    #         updateInterestInput: $updateInterestInput
    #         updateLocationInput: $updateLocationInput
    #         updateUserInput: $updateUserInput
    #         userId: $userId
    #     ) {
    #         categories {
    #             categories
    #             _id
    #         }
    #         interest {
    #             interest
    #             _id
    #         }
    #         location {
    #             _id
    #             geometry {
    #                 coordinates
    #             }
    #             properties {
    #                 address
    #             }
    #         }
    #         user {
    #             _id
    #             createdAt
    #             description
    #             email
    #             firstName
    #             image
    #             lastName
    #         }
    #     }
    # }
`;

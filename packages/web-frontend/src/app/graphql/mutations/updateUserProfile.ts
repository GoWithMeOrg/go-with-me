import gql from 'graphql-tag';

export const UPDATE_USER_PROFILE = gql`
    mutation Mutation(
        $userId: ID!
        $categoryId: ID
        $createCategoryInput: CreateCategoryInput
        $updateUserInput: UpdateUserInput
        $createInterestInput: CreateInterestInput
        $createLocationInput: CreateLocationInput
        $interestId: ID
        $locationId: ID
        $updateCategoryInput: UpdateCategoryInput
        $updateInterestInput: UpdateInterestInput
        $updateLocationInput: UpdateLocationInput
        $createTagInput: CreateTagInput
        $tagId: ID
        $updateTagInput: UpdateTagInput
    ) {
        updateUserProfile(
            userId: $userId
            categoryId: $categoryId
            createCategoryInput: $createCategoryInput
            updateUserInput: $updateUserInput
            createInterestInput: $createInterestInput
            createLocationInput: $createLocationInput
            interestId: $interestId
            locationId: $locationId
            updateCategoryInput: $updateCategoryInput
            updateInterestInput: $updateInterestInput
            updateLocationInput: $updateLocationInput
            createTagInput: $createTagInput
            tagId: $tagId
            updateTagInput: $updateTagInput
        ) {
            category {
                _id
                categories
                ownerId
                ownerType
            }
            interest {
                _id
                interests
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
            tag {
                _id
                ownerId
                ownerType
                tags
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

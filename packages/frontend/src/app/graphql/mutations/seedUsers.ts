import { gql } from '@apollo/client';

export const SEED_USERS = gql`
    mutation SeedUsers($inputs: SeedUserInput!) {
        seedUsers(inputs: $inputs) {
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
                }
                properties {
                    address
                    ownerId
                    ownerType
                }
                type
            }
            tag {
                _id
                ownerId
                ownerType
                tags
            }
            user {
                _id
                description
                email
                firstName
                image
                lastName
            }
        }
    }
`;

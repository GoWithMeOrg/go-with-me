import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query Users {
        users {
            _id
            firstName
            lastName
            image
        }
    }
`;

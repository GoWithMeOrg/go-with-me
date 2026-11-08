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

export const FIND_BY_EMAIL_OR_NAME = gql`
    query FindByEmailOrName($query: String) {
        findByEmailOrName(query: $query) {
            _id
            firstName
            lastName
            email
            image
        }
    }
`;

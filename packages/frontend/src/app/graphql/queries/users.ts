import { gql, TypedDocumentNode } from '@apollo/client';

import { User } from '../types';

export const GET_USERS: TypedDocumentNode<{ users: User[] }> = gql`
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

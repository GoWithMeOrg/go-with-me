import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';

import { CompanionsResponse } from '../types';

export const GET_COMPANIONS_BY_OWNER_ID: TypedDocumentNode<{
    companionsByOwnerId: CompanionsResponse;
}> = gql`
    query CompanionsByOwnerId($offset: Int, $limit: Int) {
        companionsByOwnerId(offset: $offset, limit: $limit) {
            companions {
                _id
                firstName
                lastName
                image
            }
            totalCompanions
        }
    }
`;

export const GET_FIND_COMPANION = gql`
    query FindCompanion($query: String) {
        findCompanion(query: $query) {
            _id
            firstName
            lastName
            image
        }
    }
`;

export const GET_IS_USER_COMPANION: TypedDocumentNode<{
    isUserCompanion: boolean;
}> = gql`
    query IsUserCompanion($userId: ID!, $companionId: ID!) {
        isUserCompanion(user_id: $userId, companion_id: $companionId)
    }
`;

import gql from 'graphql-tag';

export const GET_COMPANIONS_BY_OWNER_ID = gql`
    query CompanionsByOwnerId($ownerId: ID!, $limit: Int, $offset: Int) {
        companionsByOwnerId(ownerId: $ownerId, limit: $limit, offset: $offset) {
            companions {
                firstName
                lastName
                image
                _id
            }
            totalCompanions
        }
    }
`;

export const GET_FIND_COMPANION = gql`
    query FindCompanion($query: String) {
        findCompanion(query: $query) {
            companions {
                _id
                firstName
                lastName
                image
            }
        }
    }
`;

export const GET_IS_USER_COMPANION = gql`
    query IsUserCompanion($userId: ID!, $companionId: ID!) {
        isUserCompanion(user_id: $userId, companion_id: $companionId)
    }
`;

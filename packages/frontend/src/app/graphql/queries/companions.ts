import gql from 'graphql-tag';

export const GET_COMPANIONS_BY_OWNER_ID = gql`
    query CompanionsByOwnerId($ownerId: ID!, $offset: Int, $limit: Int) {
        companionsByOwnerId(ownerId: $ownerId, offset: $offset, limit: $limit) {
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

// export const GET_IS_USER_COMPANION = gql`
//     query IsUserCompanion($userId: ID!, $companionId: ID!) {
//         isUserCompanion(user_id: $userId, companion_id: $companionId)
//     }
// `;

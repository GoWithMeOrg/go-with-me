import gql from "graphql-tag";

export const GET_COMPANIONS = gql`
    query Companions($userId: String!, $limit: Int) {
        companions(user_id: $userId, limit: $limit) {
            totalCompanions
            companions {
                _id
                email
                name
                image
            }
        }
    }
`;

export const GET_FIND_COMPANION = gql`
    query FindCompanion($userId: ID!, $email: String, $name: String) {
        findCompanion(user_id: $userId, email: $email, name: $name) {
            _id
            name
            image
        }
    }
`;

export const GET_IS_USER_COMPANION = gql`
    query IsUserCompanion($userId: ID!, $companionId: ID!) {
        isUserCompanion(user_id: $userId, companion_id: $companionId)
    }
`;

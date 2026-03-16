import { gql } from '@apollo/client';

export const GET_COMPANION_REQUESTS = gql`
    query GetCompanionRequests($userId: ID!) {
        getCompanionRequests(user_id: $userId) {
            _id
            receiver {
                _id
                firstName
                lastName
                image
            }
            sender {
                _id
                firstName
                lastName
                image
            }
            status
        }
    }
`;

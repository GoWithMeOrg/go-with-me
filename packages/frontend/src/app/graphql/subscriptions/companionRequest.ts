import { gql } from '@apollo/client';

export const COMPANION_REQUEST_SUBSCRIPTION = gql`
    subscription Subscription {
        sendRequestCompanion {
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

import gql from 'graphql-tag';

export const GET_SESSION = gql`
    query GetSession {
        session {
            _id
            firstName
            lastName
            email
            roles
        }
    }
`;

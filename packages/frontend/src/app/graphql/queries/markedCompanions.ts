import { gql } from '@apollo/client';

export const GET_MARKED_COMPANIONS = gql`
    query GetMarkedCompanions {
        markedCompanions
    }
`;

import { gql } from '@apollo/client';

export const SEED_EVENTS = gql`
    mutation SeedEvents($inputs: SeedEventsInput!) {
        seedEvents(inputs: $inputs) {
            _id
        }
    }
`;

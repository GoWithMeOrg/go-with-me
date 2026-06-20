import { gql } from '@apollo/client';

export const MARK_COMPANION = gql`
    mutation MarkCompanion($companionIds: [ID!]!) {
        markCompanion(companion_ids: $companionIds)
    }
`;

export const UNMARK_COMPANION = gql`
    mutation UnmarkCompanion($companionId: ID!) {
        unmarkCompanion(companion_id: $companionId)
    }
`;

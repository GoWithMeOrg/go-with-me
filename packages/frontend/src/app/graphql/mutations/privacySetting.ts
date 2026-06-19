import { gql } from '@apollo/client';

export const UPDATE_PRIVACY_SETTING = gql`
    mutation UpdatePrivacySetting($input: UpdatePrivacySettingInput!) {
        updatePrivacySetting(input: $input) {
            _id
            whoCanSeeEvents
            whoCanInviteToEvents
        }
    }
`;

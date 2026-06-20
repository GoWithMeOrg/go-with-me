import { gql, TypedDocumentNode } from '@apollo/client';
import { PrivacySetting } from '../types';

export const GET_MY_PRIVACY_SETTING: TypedDocumentNode<{ myPrivacySetting: PrivacySetting }> = gql`
    query MyPrivacySetting {
        myPrivacySetting {
            _id
            whoCanSeeEvents
            whoCanInviteToEvents
            markedForWhoCanSeeEvents
            markedForWhoCanInviteToEvents
        }
    }
`;

export const GET_PRIVACY_SETTINGS_FOR_USERS: TypedDocumentNode<{
    privacySettingsForUsers: PrivacySetting[];
}> = gql`
    query PrivacySettingsForUsers($userIds: [ID!]!) {
        privacySettingsForUsers(user_ids: $userIds) {
            _id
            ownerId
            whoCanSeeEvents
            whoCanInviteToEvents
            markedForWhoCanSeeEvents
            markedForWhoCanInviteToEvents
        }
    }
`;

export const GET_PRIVACY_SETTING_BY_USER_ID: TypedDocumentNode<{
    privacySettingByUserId: PrivacySetting;
}> = gql`
    query PrivacySettingByUserId($userId: ID!) {
        privacySettingByUserId(user_id: $userId) {
            _id
            whoCanSeeEvents
            whoCanInviteToEvents
            markedForWhoCanSeeEvents
            markedForWhoCanInviteToEvents
        }
    }
`;

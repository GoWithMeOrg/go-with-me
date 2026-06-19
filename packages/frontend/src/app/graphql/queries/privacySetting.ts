import { gql, TypedDocumentNode } from '@apollo/client';
import { PrivacySetting } from '../types';

export const GET_MY_PRIVACY_SETTING: TypedDocumentNode<{ myPrivacySetting: PrivacySetting }> = gql`
    query MyPrivacySetting {
        myPrivacySetting {
            _id
            whoCanSeeEvents
            whoCanInviteToEvents
        }
    }
`;

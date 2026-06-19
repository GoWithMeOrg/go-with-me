import gql from 'graphql-tag';

export const GET_MY_PRIVACY_SETTING = gql`
    query MyPrivacySetting {
        myPrivacySetting {
            _id
            whoCanSeeEvents
            whoCanInviteToEvents
        }
    }
`;

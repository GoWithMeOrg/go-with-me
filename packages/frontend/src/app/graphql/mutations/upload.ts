import { gql } from '@apollo/client';

export const GET_PRESIGNED_URL = gql`
    mutation GetPresignedUrl($input: UploadFileInput!, $userId: String!) {
        getPresignedUrl(input: $input, userId: $userId) {
            presignedUrl
            publicUrl
        }
    }
`;

import { gql } from '@apollo/client';

export const GET_PRESIGNED_URL = gql`
    mutation GetPresignedUrl($entityId: String!, $input: UploadFileInput!, $folder: String!) {
        getPresignedUrl(entityId: $entityId, input: $input, folder: $folder) {
            presignedUrl
            publicUrl
        }
    }
`;

export const DELETE_FILE_MUTATION = gql`
    mutation DeleteFile($fileKey: String!) {
        deleteFile(fileKey: $fileKey)
    }
`;

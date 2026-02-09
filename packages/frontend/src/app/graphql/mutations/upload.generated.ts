import * as Types from '../types';

export type GetPresignedUrlMutationVariables = Types.Exact<{
  entityId: Types.Scalars['String']['input'];
  input: Types.UploadFileInput;
  folder: Types.Scalars['String']['input'];
}>;


export type GetPresignedUrlMutation = { __typename?: 'Mutation', getPresignedUrl: { __typename?: 'PresignedUrlResponse', presignedUrl: string, publicUrl: string } };

export type DeleteFileMutationVariables = Types.Exact<{
  fileKey: Types.Scalars['String']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: boolean };

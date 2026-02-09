import * as Types from '../types';

export type CreatePermissionMutationVariables = Types.Exact<{
  createPermissionInput: Types.CreatePermissionInput;
}>;


export type CreatePermissionMutation = { __typename?: 'Mutation', createPermission: { __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } } };

export type UpdatePermissionMutationVariables = Types.Exact<{
  updatePermissionInput: Types.UpdatePermissionInput;
}>;


export type UpdatePermissionMutation = { __typename?: 'Mutation', updatePermission: { __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } } };

export type RemovePermissionMutationVariables = Types.Exact<{
  removePermissionId: Types.Scalars['ID']['input'];
}>;


export type RemovePermissionMutation = { __typename?: 'Mutation', removePermission: { __typename?: 'DeleteResult', acknowledged: boolean, deletedCount: number } };

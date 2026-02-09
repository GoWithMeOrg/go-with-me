import * as Types from '../types';

export type CreateRoleMutationVariables = Types.Exact<{
  createRoleInput: Types.CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', _id: string, description?: string | null, name: string, permissions: Array<{ __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } }> } };

export type UpdateRoleMutationVariables = Types.Exact<{
  updateRoleInput: Types.UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'Role', _id: string, description?: string | null, name: string, permissions: Array<{ __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } }> } };

export type RemoveRoleMutationVariables = Types.Exact<{
  removeRoleId: Types.Scalars['ID']['input'];
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', removeRole: boolean };

import * as Types from '../types';

export type UpdateUserMutationVariables = Types.Exact<{
  updateUserId: Types.Scalars['ID']['input'];
  user: Types.UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, description?: string | null, image?: string | null, roles?: Array<{ __typename?: 'Role', _id: string, name: string, description?: string | null }> | null } };

export type AddUserRoleMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  roleName: Types.Scalars['String']['input'];
}>;


export type AddUserRoleMutation = { __typename?: 'Mutation', addUserRole: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, roles?: Array<{ __typename?: 'Role', _id: string, name: string, description?: string | null }> | null } };

export type RemoveUserRoleMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  roleName: Types.Scalars['String']['input'];
}>;


export type RemoveUserRoleMutation = { __typename?: 'Mutation', removeUserRole: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, roles?: Array<{ __typename?: 'Role', _id: string, name: string, description?: string | null }> | null } };

export type RemoveUserMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: boolean };

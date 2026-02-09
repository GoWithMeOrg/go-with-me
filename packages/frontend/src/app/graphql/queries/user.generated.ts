import * as Types from '../types';

export type GetUserByIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, description?: string | null, email: string, firstName: string, image?: string | null, lastName: string, roles?: Array<{ __typename?: 'Role', _id: string, description?: string | null, name: string, permissions: Array<{ __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } }> }> | null } };

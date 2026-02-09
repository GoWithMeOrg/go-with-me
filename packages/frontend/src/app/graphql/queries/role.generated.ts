import * as Types from '../types';

export type GetRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', _id: string, description?: string | null, name: string, permissions: Array<{ __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } }> }> };

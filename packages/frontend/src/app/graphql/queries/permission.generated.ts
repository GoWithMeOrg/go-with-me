import * as Types from '../types';

export type PermissionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PermissionsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', _id: string, action: Types.Action, description?: string | null, name: string, resource: { __typename?: 'Resource', _id: string, name: string, slug: string } }> };

import * as Types from '../types';

export type GetSessionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', session?: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, roles: Array<string> } | null };

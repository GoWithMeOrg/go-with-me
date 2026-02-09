import * as Types from '../types';

export type SearchResourcesQueryVariables = Types.Exact<{
  query?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type SearchResourcesQuery = { __typename?: 'Query', searchResources: Array<{ __typename?: 'Resource', _id: string, name: string, slug: string }> };

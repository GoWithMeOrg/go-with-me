import * as Types from '../types';

export type UserProfileQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'UserProfile', tag?: { __typename?: 'Tag', tags: Array<string>, _id: string } | null, category?: { __typename?: 'Category', _id: string, categories: Array<string> } | null, interest?: { __typename?: 'Interest', _id: string, interests: Array<string> } | null, location?: { __typename?: 'Location', _id: string, geometry: { __typename?: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename?: 'LocationProperties', address?: string | null } } | null, user: { __typename?: 'User', _id: string, description?: string | null, email: string, firstName: string, image?: string | null, lastName: string } } };

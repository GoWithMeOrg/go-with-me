import * as Types from '../types';

export type MutationMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  categoryId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  createCategoryInput?: Types.InputMaybe<Types.CreateCategoryInput>;
  updateUserInput?: Types.InputMaybe<Types.UpdateUserInput>;
  createInterestInput?: Types.InputMaybe<Types.CreateInterestInput>;
  createLocationInput?: Types.InputMaybe<Types.CreateLocationInput>;
  interestId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  locationId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  updateCategoryInput?: Types.InputMaybe<Types.UpdateCategoryInput>;
  updateInterestInput?: Types.InputMaybe<Types.UpdateInterestInput>;
  updateLocationInput?: Types.InputMaybe<Types.UpdateLocationInput>;
  createTagInput?: Types.InputMaybe<Types.CreateTagInput>;
  tagId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  updateTagInput?: Types.InputMaybe<Types.UpdateTagInput>;
}>;


export type MutationMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'UserProfile', category?: { __typename?: 'Category', _id: string, categories: Array<string>, ownerId: string, ownerType: string } | null, interest?: { __typename?: 'Interest', _id: string, interests: Array<string>, ownerId: string, ownerType: string } | null, location?: { __typename?: 'Location', _id: string, type: string, geometry: { __typename?: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename?: 'LocationProperties', address?: string | null, ownerId: string, ownerType: string } } | null, user: { __typename?: 'User', description?: string | null, email: string, firstName: string, image?: string | null, lastName: string }, tag?: { __typename?: 'Tag', _id: string, ownerId: string, ownerType: string, tags: Array<string> } | null } };

import * as Types from '../types';

export type LocationByIdQueryVariables = Types.Exact<{
  locationById: Types.Scalars['ID']['input'];
}>;


export type LocationByIdQuery = { __typename?: 'Query', locationById: { __typename?: 'Location', _id: string, type: string, geometry: { __typename?: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename?: 'LocationProperties', address?: string | null, ownerId: string, ownerType: string } } };

export type LocationByOwnerIdQueryVariables = Types.Exact<{
  ownerId: Types.Scalars['ID']['input'];
}>;


export type LocationByOwnerIdQuery = { __typename?: 'Query', locationByOwnerId: { __typename?: 'Location', _id: string, type: string, geometry: { __typename?: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename?: 'LocationProperties', address?: string | null, ownerId: string, ownerType: string } } };

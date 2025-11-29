export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateLocationInput = {
  coordinates: Array<Scalars['Float']['input']>;
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
  properties?: InputMaybe<LocationPropertiesInput>;
};

export type CreateUserInput = {
  createdAt: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
  updatedAt: Scalars['DateTime']['input'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['String']['output'];
  geometry: LocationGeometry;
  properties: LocationProperties;
  type: Scalars['String']['output'];
};

export type LocationGeometry = {
  __typename?: 'LocationGeometry';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type LocationProperties = {
  __typename?: 'LocationProperties';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LocationPropertiesInput = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Создать локацию */
  createLocation: Location;
  /** Создать пользователя */
  createUser: User;
  /** Удалить локацию */
  removeLocation: Scalars['Boolean']['output'];
  /** Удалить пользователя */
  removeUser: Scalars['Boolean']['output'];
  /** Обновить локацию */
  updateLocation: Location;
  /** Обновить данные пользователя */
  updateUser: User;
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput;
};


export type MutationUpdateUserArgs = {
  updateUserId: Scalars['ID']['input'];
  user: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  adminRoute: Scalars['String']['output'];
  /** Поиск места по id */
  locationById: Location;
  /** Поиск места по ownerId */
  locationByOwnerId: Location;
  moderatorRoute: Scalars['String']['output'];
  session?: Maybe<User>;
  /** Поиск пользователя по id */
  user: User;
  /** Получить всех пользователей */
  users: Array<User>;
};


export type QueryLocationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateLocationInput = {
  _id: Scalars['ID']['input'];
  coordinates?: InputMaybe<Array<Scalars['Float']['input']>>;
  properties?: InputMaybe<LocationPropertiesInput>;
};

export type UpdateUserInput = {
  _id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  location?: Maybe<Location>;
  roles: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Categories = {
  __typename?: 'Categories';
  _id: Scalars['ID']['output'];
  categories: Array<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
};

export type CreateCategoriesInput = {
  categories: Array<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
};

export type CreateInterestInput = {
  interests: Array<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
};

export type CreateLocationInput = {
  geometry: LocationGeometryInput;
  properties: LocationPropertiesInput;
};

export type CreateTagInput = {
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
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

export type Interest = {
  __typename?: 'Interest';
  _id: Scalars['ID']['output'];
  interests: Array<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
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

export type LocationGeometryInput = {
  coordinates: Array<Scalars['Float']['input']>;
};

export type LocationProperties = {
  __typename?: 'LocationProperties';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LocationPropertiesInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategories: Categories;
  createInterest: Interest;
  /** Создать локацию */
  createLocation: Location;
  createTag: Tag;
  /** Создать пользователя */
  createUser: User;
  removeCategories: Categories;
  removeInterest: Interest;
  /** Удалить локацию */
  removeLocation: Scalars['Boolean']['output'];
  removeTag: Tag;
  /** Удалить пользователя */
  removeUser: Scalars['Boolean']['output'];
  updateCategories: Categories;
  updateInterest: Interest;
  /** Обновить локацию */
  updateLocation: Location;
  updateTag: Tag;
  /** Обновить данные пользователя */
  updateUser: User;
  updateUserProfile: UserProfile;
};


export type MutationCreateCategoriesArgs = {
  createCategoriesInput: CreateCategoriesInput;
};


export type MutationCreateInterestArgs = {
  createInterestInput: CreateInterestInput;
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveCategoriesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveInterestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoriesArgs = {
  updateCategoriesInput: UpdateCategoriesInput;
};


export type MutationUpdateInterestArgs = {
  updateInterestInput: UpdateInterestInput;
};


export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput;
};


export type MutationUpdateTagArgs = {
  updateTagInput: UpdateTagInput;
};


export type MutationUpdateUserArgs = {
  updateUserId: Scalars['ID']['input'];
  user: UpdateUserInput;
};


export type MutationUpdateUserProfileArgs = {
  categoriesId?: InputMaybe<Scalars['ID']['input']>;
  createCategoriesInput?: InputMaybe<CreateCategoriesInput>;
  createInterestInput?: InputMaybe<CreateInterestInput>;
  createLocationInput?: InputMaybe<CreateLocationInput>;
  createTagInput?: InputMaybe<CreateTagInput>;
  interestId?: InputMaybe<Scalars['ID']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  tagId?: InputMaybe<Scalars['ID']['input']>;
  updateCategoriesInput?: InputMaybe<UpdateCategoriesInput>;
  updateInterestInput?: InputMaybe<UpdateInterestInput>;
  updateLocationInput?: InputMaybe<UpdateLocationInput>;
  updateTagInput?: InputMaybe<UpdateTagInput>;
  updateUserInput?: InputMaybe<UpdateUserInput>;
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  adminRoute: Scalars['String']['output'];
  /** Поиск категорий по id */
  categoriesById: Categories;
  /** Поиск категорий по ownerId */
  categoriesByOwnerId: Categories;
  /** Поиск интересов по id */
  interestById: Interest;
  /** Поиск интересов по ownerId */
  interestByOwnerId: Interest;
  /** Поиск места по id */
  locationById: Location;
  /** Поиск места по ownerId */
  locationByOwnerId: Location;
  moderatorRoute: Scalars['String']['output'];
  session?: Maybe<User>;
  /** Поиск категорий по id */
  tagById: Tag;
  /** Поиск категорий по ownerId */
  tagByOwnerId: Tag;
  /** Поиск пользователя по id */
  user: User;
  /** Составной профиль пользователя */
  userProfile: UserProfile;
  /** Получить всех пользователей */
  users: Array<User>;
};


export type QueryCategoriesByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryInterestByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInterestByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryLocationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryTagByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserProfileArgs = {
  userId: Scalars['ID']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type UpdateCategoriesInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateInterestInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  interests: Array<Scalars['String']['input']>;
};

export type UpdateLocationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  geometry?: InputMaybe<LocationGeometryInput>;
  properties?: InputMaybe<UpdateLocationPropertiesInput>;
};

export type UpdateLocationPropertiesInput = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
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
  roles: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  categories?: Maybe<Categories>;
  interest?: Maybe<Interest>;
  location?: Maybe<Location>;
  tag?: Maybe<Tag>;
  user: User;
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', session?: { __typename?: 'User', _id: string, firstName: string, lastName: string, email: string, roles: Array<string> } | null };

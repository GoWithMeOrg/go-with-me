import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export enum Action {
  Create = 'CREATE',
  Delete = 'DELETE',
  Edit = 'EDIT',
  Read = 'READ'
}

export type Category = {
  __typename: 'Category';
  _id: Scalars['ID']['output'];
  categories: Array<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
};

export type CompanionRequest = {
  __typename: 'CompanionRequest';
  _id: Scalars['ID']['output'];
  receiver: User;
  sender: User;
  status: Scalars['String']['output'];
};

export type CompanionsResponse = {
  __typename: 'CompanionsResponse';
  companions: Array<User>;
  totalCompanions: Scalars['Int']['output'];
};

export type CreateCategoryInput = {
  categories: Array<Scalars['String']['input']>;
  ownerId: InputMaybe<Scalars['ID']['input']>;
  ownerType: InputMaybe<Scalars['String']['input']>;
};

export type CreateEventInput = {
  description: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  image: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizer: InputMaybe<Scalars['ID']['input']>;
  privacy: Privacy;
  startDate: Scalars['DateTime']['input'];
  time: InputMaybe<Scalars['String']['input']>;
};

export type CreateInterestInput = {
  interests: Array<Scalars['String']['input']>;
  ownerId: InputMaybe<Scalars['ID']['input']>;
  ownerType: InputMaybe<Scalars['String']['input']>;
};

export type CreateLocationInput = {
  geometry: LocationGeometryInput;
  properties: LocationPropertiesInput;
};

export type CreateRoleInput = {
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissionIds: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreateTagInput = {
  ownerId: InputMaybe<Scalars['ID']['input']>;
  ownerType: InputMaybe<Scalars['String']['input']>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roles: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Event = {
  __typename: 'Event';
  _id: Scalars['ID']['output'];
  category: Maybe<Category>;
  description: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  image: Maybe<Scalars['String']['output']>;
  interest: Maybe<Interest>;
  location: Maybe<Location>;
  name: Scalars['String']['output'];
  organizer: User;
  privacy: Privacy;
  startDate: Scalars['DateTime']['output'];
  tag: Maybe<Tag>;
  time: Maybe<Scalars['String']['output']>;
};

export type Interest = {
  __typename: 'Interest';
  _id: Scalars['ID']['output'];
  interests: Array<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
};

export type Location = {
  __typename: 'Location';
  _id: Scalars['String']['output'];
  geometry: LocationGeometry;
  properties: LocationProperties;
  type: Scalars['String']['output'];
};

export type LocationGeometry = {
  __typename: 'LocationGeometry';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type LocationGeometryInput = {
  coordinates: Array<Scalars['Float']['input']>;
};

export type LocationProperties = {
  __typename: 'LocationProperties';
  address: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
};

export type LocationPropertiesInput = {
  address: InputMaybe<Scalars['String']['input']>;
  ownerId: InputMaybe<Scalars['ID']['input']>;
  ownerType: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename: 'Mutation';
  acceptCompanionRequest: CompanionRequest;
  addPermissionToRole: Role;
  /** добавать роль пользователю */
  addUserRole: User;
  createCategories: Category;
  /** Создать событие */
  createEvent: Event;
  createInterest: Interest;
  /** Создать локацию */
  createLocation: Location;
  /** Creates missing CRUD permissions for a specific resource based on Action enum */
  createResourcePermissions: Array<Permission>;
  createRole: Role;
  createTag: Tag;
  /** Создать пользователя */
  createUser: User;
  /** Удалить файл из хранилища по его ключу */
  deleteFile: Scalars['Boolean']['output'];
  /** Получить пресайнд-ссылку для прямой загрузки файла в MinIO/S3 */
  getPresignedUrl: PresignedUrlResponse;
  registerResource: Resource;
  rejectCompanionRequest: CompanionRequest;
  removeCategories: Category;
  removeCompanion: Scalars['Boolean']['output'];
  /** Удалить событие */
  removeEvent: Scalars['Boolean']['output'];
  removeInterest: Interest;
  /** Удалить локацию */
  removeLocation: Scalars['Boolean']['output'];
  removePermissionFromRole: Role;
  /** Удаление роли */
  removeRole: Scalars['Boolean']['output'];
  removeTag: Tag;
  /** Удалить пользователя */
  removeUser: Scalars['Boolean']['output'];
  /** добавать роль пользователю */
  removeUserRole: User;
  /** Генерация тестовых данных (доступно только в DEV режиме) */
  seedUsers: SeedUserResult;
  sendRequestCompanion: CompanionRequest;
  /** Переключает статус активности права (включает/выключает) */
  togglePermissionStatus: Permission;
  updateCategories: Category;
  /** Обновить данные события */
  updateEvent: Event;
  updateInterest: Interest;
  /** Обновить локацию */
  updateLocation: Location;
  updateRole: Role;
  updateTag: Tag;
  /** Обновить данные пользователя */
  updateUser: User;
  updateUserProfile: UserProfile;
};


export type MutationAcceptCompanionRequestArgs = {
  request_id: Scalars['ID']['input'];
};


export type MutationAddPermissionToRoleArgs = {
  permissionId: Array<Scalars['ID']['input']>;
  roleId: Scalars['ID']['input'];
};


export type MutationAddUserRoleArgs = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateCategoriesArgs = {
  createCategoriesInput: CreateCategoryInput;
};


export type MutationCreateEventArgs = {
  createCategoryInput: InputMaybe<CreateCategoryInput>;
  createEventInput: CreateEventInput;
  createInterestInput: InputMaybe<CreateInterestInput>;
  createLocationInput: InputMaybe<CreateLocationInput>;
  createTagInput: InputMaybe<CreateTagInput>;
};


export type MutationCreateInterestArgs = {
  createInterestInput: CreateInterestInput;
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
};


export type MutationCreateResourcePermissionsArgs = {
  resourceId: Scalars['ID']['input'];
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteFileArgs = {
  fileKey: Scalars['String']['input'];
};


export type MutationGetPresignedUrlArgs = {
  entityId: Scalars['String']['input'];
  folder?: Scalars['String']['input'];
  input: UploadFileInput;
};


export type MutationRegisterResourceArgs = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};


export type MutationRejectCompanionRequestArgs = {
  request_id: Scalars['ID']['input'];
};


export type MutationRemoveCategoriesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCompanionArgs = {
  companion_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationRemoveEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveInterestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePermissionFromRoleArgs = {
  permissionId: Scalars['ID']['input'];
  roleId: Scalars['ID']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserRoleArgs = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationSeedUsersArgs = {
  inputs: SeedUserInput;
};


export type MutationSendRequestCompanionArgs = {
  receiver: Scalars['ID']['input'];
  sender: Scalars['ID']['input'];
};


export type MutationTogglePermissionStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoriesArgs = {
  updateCategoriesInput: UpdateCategoryInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  updateEventInput: UpdateEventInput;
};


export type MutationUpdateInterestArgs = {
  updateInterestInput: UpdateInterestInput;
};


export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateTagArgs = {
  updateTagInput: UpdateTagInput;
};


export type MutationUpdateUserArgs = {
  updateUserId: Scalars['ID']['input'];
  user: UpdateUserInput;
};


export type MutationUpdateUserProfileArgs = {
  categoryId: InputMaybe<Scalars['ID']['input']>;
  createCategoryInput: InputMaybe<CreateCategoryInput>;
  createInterestInput: InputMaybe<CreateInterestInput>;
  createLocationInput: InputMaybe<CreateLocationInput>;
  createTagInput: InputMaybe<CreateTagInput>;
  interestId: InputMaybe<Scalars['ID']['input']>;
  locationId: InputMaybe<Scalars['ID']['input']>;
  tagId: InputMaybe<Scalars['ID']['input']>;
  updateCategoryInput: InputMaybe<UpdateCategoryInput>;
  updateInterestInput: InputMaybe<UpdateInterestInput>;
  updateLocationInput: InputMaybe<UpdateLocationInput>;
  updateTagInput: InputMaybe<UpdateTagInput>;
  updateUserInput: InputMaybe<UpdateUserInput>;
  userId: Scalars['ID']['input'];
};

export type Permission = {
  __typename: 'Permission';
  _id: Scalars['ID']['output'];
  action: Action;
  description: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  resource: Resource;
};

export type PresignedUrlResponse = {
  __typename: 'PresignedUrlResponse';
  /** Путь к файлу для сохранения в БД (Key) */
  fileKey: Scalars['String']['output'];
  /** URL для загрузки файла (метод PUT) */
  presignedUrl: Scalars['String']['output'];
  /** Публичная ссылка для отображения */
  publicUrl: Scalars['String']['output'];
};

export enum Privacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename: 'Query';
  adminRoute: Scalars['String']['output'];
  /** Поиск категорий по id */
  categoriesById: Category;
  /** Поиск категорий по ownerId */
  categoriesByOwnerId: Category;
  /** Поиск интересов по ownerId */
  companionsByOwnerId: CompanionsResponse;
  /** Получить событие по id */
  event: Event;
  /** Получить все события */
  events: Array<Event>;
  /** Найти пользователей по email или имени */
  findByEmailOrName: Array<User>;
  /** Поиск компаньонов по email или имени */
  findCompanion: Array<User>;
  getCompanionRequests: Array<CompanionRequest>;
  /** Поиск интересов по id */
  interestById: Interest;
  /** Поиск интересов по ownerId */
  interestByOwnerId: Interest;
  /** Поиск места по id */
  locationById: Location;
  /** Поиск места по ownerId */
  locationByOwnerId: Location;
  moderatorRoute: Scalars['String']['output'];
  /** Поиск права по id */
  permissionById: Maybe<Permission>;
  /** Поиск права по названию */
  permissionByName: Permission;
  /** Получить все права */
  permissions: Array<Permission>;
  resourceBySlug: Maybe<Resource>;
  /** Список всех зарегистрированных ресурсов */
  resources: Array<Resource>;
  /** Поиск роли по id */
  roleById: Maybe<Role>;
  /** Поиск роли по названию */
  roleByName: Role;
  /** Поиск роли по id пользователя */
  roleByUserId: Maybe<User>;
  /** Получить все роли */
  roles: Array<Role>;
  /** Поиск ресурсов по названию или слагу для управления ролями */
  searchResources: Array<Resource>;
  session: Maybe<User>;
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


export type QueryCompanionsByOwnerIdArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  ownerId: Scalars['ID']['input'];
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindByEmailOrNameArgs = {
  query: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCompanionArgs = {
  query: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCompanionRequestsArgs = {
  user_id: Scalars['ID']['input'];
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


export type QueryPermissionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPermissionByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryResourceBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRoleByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryRoleByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QuerySearchResourcesArgs = {
  query: InputMaybe<Scalars['String']['input']>;
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

export type Resource = {
  __typename: 'Resource';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  slug: Scalars['String']['output'];
};

export type Role = {
  __typename: 'Role';
  _id: Scalars['ID']['output'];
  description: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
};

export type SeedUserInput = {
  category: InputMaybe<CreateCategoryInput>;
  interest: InputMaybe<CreateInterestInput>;
  location: InputMaybe<CreateLocationInput>;
  tag: InputMaybe<CreateTagInput>;
  user: InputMaybe<CreateUserInput>;
};

export type SeedUserResult = {
  __typename: 'SeedUserResult';
  category: Maybe<Category>;
  interest: Maybe<Interest>;
  location: Maybe<Location>;
  tag: Maybe<Tag>;
  user: Maybe<User>;
};

export type Subscription = {
  __typename: 'Subscription';
  sendRequestCompanion: CompanionRequest;
};

export type Tag = {
  __typename: 'Tag';
  _id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type UpdateCategoryInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  categories: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateEventInput = {
  _id: Scalars['ID']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  organizer: InputMaybe<Scalars['ID']['input']>;
  privacy: InputMaybe<Privacy>;
  startDate: InputMaybe<Scalars['DateTime']['input']>;
  time: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInterestInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  interests: Array<Scalars['String']['input']>;
};

export type UpdateLocationInput = {
  _id: InputMaybe<Scalars['ID']['input']>;
  geometry: InputMaybe<LocationGeometryInput>;
  properties: InputMaybe<UpdateLocationPropertiesInput>;
};

export type UpdateLocationPropertiesInput = {
  address: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  _id: Scalars['String']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  permissionIds: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateTagInput = {
  _id: InputMaybe<Scalars['String']['input']>;
  tags: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  _id: Scalars['ID']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  firstName: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
  lastName: InputMaybe<Scalars['String']['input']>;
  roles: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UploadFileInput = {
  /** Оригинальное имя файла */
  fileName: Scalars['String']['input'];
  /** MIME-тип файла */
  fileType: Scalars['String']['input'];
};

export type User = {
  __typename: 'User';
  _id: Scalars['ID']['output'];
  description: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  roles: Maybe<Array<Role>>;
};

export type UserProfile = {
  __typename: 'UserProfile';
  category: Maybe<Category>;
  interest: Maybe<Interest>;
  location: Maybe<Location>;
  tag: Maybe<Tag>;
  user: User;
};

export type GetCompanionRequestsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetCompanionRequestsQuery = { __typename: 'Query', getCompanionRequests: Array<{ __typename: 'CompanionRequest', _id: string, status: string, receiver: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }, sender: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null } }> };

export type LocationByIdQueryVariables = Exact<{
  locationById: Scalars['ID']['input'];
}>;


export type LocationByIdQuery = { __typename: 'Query', locationById: { __typename: 'Location', _id: string, type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename: 'LocationProperties', address: string | null, ownerId: string, ownerType: string } } };

export type LocationByOwnerIdQueryVariables = Exact<{
  ownerId: Scalars['ID']['input'];
}>;


export type LocationByOwnerIdQuery = { __typename: 'Query', locationByOwnerId: { __typename: 'Location', _id: string, type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename: 'LocationProperties', address: string | null, ownerId: string, ownerType: string } } };

export type PermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionsQuery = { __typename: 'Query', permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, isActive: boolean, name: string, resource: { __typename: 'Resource', name: string } }> };

export type ResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourcesQuery = { __typename: 'Query', resources: Array<{ __typename: 'Resource', _id: string, name: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, isActive: boolean, name: string }> }> };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename: 'Query', roles: Array<{ __typename: 'Role', _id: string, description: string | null, name: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, name: string, resource: { __typename: 'Resource', _id: string, name: string, slug: string } }> }> };

export type RoleByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type RoleByUserIdQuery = { __typename: 'Query', roleByUserId: { __typename: 'User', roles: Array<{ __typename: 'Role', name: string }> | null } | null };

export type RoleByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type RoleByNameQuery = { __typename: 'Query', roleByName: { __typename: 'Role', _id: string, name: string } };

export type SearchResourcesQueryVariables = Exact<{
  query: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchResourcesQuery = { __typename: 'Query', searchResources: Array<{ __typename: 'Resource', _id: string, name: string, slug: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, name: string, description: string | null, isActive: boolean }> }> };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename: 'Query', session: { __typename: 'User', _id: string, firstName: string, lastName: string, email: string } | null };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename: 'Query', user: { __typename: 'User', _id: string, description: string | null, email: string, firstName: string, image: string | null, lastName: string, roles: Array<{ __typename: 'Role', _id: string, description: string | null, name: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, name: string, resource: { __typename: 'Resource', _id: string, name: string, slug: string } }> }> | null } };

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserProfileQuery = { __typename: 'Query', userProfile: { __typename: 'UserProfile', tag: { __typename: 'Tag', tags: Array<string>, _id: string } | null, category: { __typename: 'Category', _id: string, categories: Array<string> } | null, interest: { __typename: 'Interest', _id: string, interests: Array<string> } | null, location: { __typename: 'Location', _id: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null, user: { __typename: 'User', _id: string, description: string | null, email: string, firstName: string, image: string | null, lastName: string } } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename: 'Query', users: Array<{ __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }> };

export type FindByEmailOrNameQueryVariables = Exact<{
  query: InputMaybe<Scalars['String']['input']>;
}>;


export type FindByEmailOrNameQuery = { __typename: 'Query', findByEmailOrName: Array<{ __typename: 'User', _id: string, firstName: string, lastName: string, email: string, image: string | null }> };


export const GetCompanionRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanionRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCompanionRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetCompanionRequestsQuery, GetCompanionRequestsQueryVariables>;
export const LocationByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LocationById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationById"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locationById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationById"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"geometry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<LocationByIdQuery, LocationByIdQueryVariables>;
export const LocationByOwnerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LocationByOwnerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locationByOwnerId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"geometry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<LocationByOwnerIdQuery, LocationByOwnerIdQueryVariables>;
export const PermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<PermissionsQuery, PermissionsQueryVariables>;
export const ResourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ResourcesQuery, ResourcesQueryVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;
export const RoleByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoleByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roleByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RoleByUserIdQuery, RoleByUserIdQueryVariables>;
export const RoleByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RoleByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roleByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RoleByNameQuery, RoleByNameQueryVariables>;
export const SearchResourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchResources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchResources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]} as unknown as DocumentNode<SearchResourcesQuery, SearchResourcesQueryVariables>;
export const GetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetSessionQuery, GetSessionQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"resource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"geometry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"}}]}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const FindByEmailOrNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindByEmailOrName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findByEmailOrName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<FindByEmailOrNameQuery, FindByEmailOrNameQueryVariables>;
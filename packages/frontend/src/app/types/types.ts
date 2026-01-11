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

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  categories: Array<Scalars['String']['output']>;
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
};

export type CreateCategoryInput = {
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

export type CreatePermissionInput = {
  action: Scalars['String']['input'];
  description: Scalars['String']['input'];
  permission: Scalars['String']['input'];
  resource: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  permissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  role: Scalars['String']['input'];
};

export type CreateTagInput = {
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roleIds?: InputMaybe<Array<Scalars['String']['input']>>;
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
  /** добавать роль пользователю */
  addUserRole: User;
  createCategories: Category;
  createInterest: Interest;
  /** Создать локацию */
  createLocation: Location;
  createPermission: Permission;
  createRole: Role;
  createTag: Tag;
  /** Создать пользователя */
  createUser: User;
  /** Удалить файл из хранилища по его ключу */
  deleteFile: Scalars['Boolean']['output'];
  /** Получить пресайнд-ссылку для прямой загрузки файла в MinIO/S3 */
  getPresignedUrl: PresignedUrlResponse;
  removeCategories: Category;
  removeInterest: Interest;
  /** Удалить локацию */
  removeLocation: Scalars['Boolean']['output'];
  removePermission: Permission;
  removeRole: Role;
  removeTag: Tag;
  /** Удалить пользователя */
  removeUser: Scalars['Boolean']['output'];
  /** добавать роль пользователю */
  removeUserRole: User;
  updateCategories: Category;
  updateInterest: Interest;
  /** Обновить локацию */
  updateLocation: Location;
  updatePermission: Permission;
  updateRole: Role;
  updateTag: Tag;
  /** Обновить данные пользователя */
  updateUser: User;
  updateUserProfile: UserProfile;
};


export type MutationAddUserRoleArgs = {
  roleName: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateCategoriesArgs = {
  createCategoriesInput: CreateCategoryInput;
};


export type MutationCreateInterestArgs = {
  createInterestInput: CreateInterestInput;
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
};


export type MutationCreatePermissionArgs = {
  createPermissionInput: CreatePermissionInput;
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


export type MutationRemoveCategoriesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveInterestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveLocationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePermissionArgs = {
  id: Scalars['ID']['input'];
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
  userId: Scalars['String']['input'];
};


export type MutationUpdateCategoriesArgs = {
  updateCategoriesInput: UpdateCategoryInput;
};


export type MutationUpdateInterestArgs = {
  updateInterestInput: UpdateInterestInput;
};


export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput;
};


export type MutationUpdatePermissionArgs = {
  updatePermissionInput: UpdatePermissionInput;
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
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  createCategoryInput?: InputMaybe<CreateCategoryInput>;
  createInterestInput?: InputMaybe<CreateInterestInput>;
  createLocationInput?: InputMaybe<CreateLocationInput>;
  createTagInput?: InputMaybe<CreateTagInput>;
  interestId?: InputMaybe<Scalars['ID']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  tagId?: InputMaybe<Scalars['ID']['input']>;
  updateCategoryInput?: InputMaybe<UpdateCategoryInput>;
  updateInterestInput?: InputMaybe<UpdateInterestInput>;
  updateLocationInput?: InputMaybe<UpdateLocationInput>;
  updateTagInput?: InputMaybe<UpdateTagInput>;
  updateUserInput?: InputMaybe<UpdateUserInput>;
  userId: Scalars['ID']['input'];
};

export type Permission = {
  __typename?: 'Permission';
  _id: Scalars['ID']['output'];
  action: Scalars['String']['output'];
  description: Scalars['String']['output'];
  permission: Scalars['String']['output'];
  resource: Scalars['String']['output'];
};

export type PresignedUrlResponse = {
  __typename?: 'PresignedUrlResponse';
  /** Путь к файлу для сохранения в БД (Key) */
  fileKey: Scalars['String']['output'];
  /** URL для загрузки файла (метод PUT) */
  presignedUrl: Scalars['String']['output'];
  /** Публичная ссылка для отображения */
  publicUrl: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminRoute: Scalars['String']['output'];
  /** Поиск категорий по id */
  categoriesById: Category;
  /** Поиск категорий по ownerId */
  categoriesByOwnerId: Category;
  /** Поиск интересов по id */
  interestById: Interest;
  /** Поиск интересов по ownerId */
  interestByOwnerId: Interest;
  /** Поиск места по id */
  locationById: Location;
  /** Поиск места по ownerId */
  locationByOwnerId: Location;
  moderatorRoute: Scalars['String']['output'];
  /** Получить все права */
  permission: Array<Permission>;
  /** Поиск роли по id */
  permissionById: Permission;
  /** Поиск роли по названию */
  permissionByName: Permission;
  /** Поиск роли по id */
  roleById: Role;
  /** Поиск роли по названию */
  roleByName: Role;
  /** Получить все роли */
  roles: Array<Role>;
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


export type QueryPermissionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPermissionByNameArgs = {
  permission: Scalars['String']['input'];
};


export type QueryRoleByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleByNameArgs = {
  role: Scalars['String']['input'];
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

export type Role = {
  __typename?: 'Role';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  permissions: Array<Permission>;
  role: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type UpdateCategoryInput = {
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

export type UpdatePermissionInput = {
  _id: Scalars['String']['input'];
  action?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
  resource?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  _id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  permissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  _id: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  roleIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UploadFileInput = {
  /** Оригинальное имя файла */
  fileName: Scalars['String']['input'];
  /** MIME-тип файла */
  fileType: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  roles?: Maybe<Array<Role>>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  category?: Maybe<Category>;
  interest?: Maybe<Interest>;
  location?: Maybe<Location>;
  tag?: Maybe<Tag>;
  user: User;
};

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
};

export enum Action {
  Create = 'CREATE',
  Delete = 'DELETE',
  Edit = 'EDIT',
  Read = 'READ'
}

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  categories: Array<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['ID']['output']>;
  ownerType?: Maybe<Scalars['String']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID']['output'];
  author: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
  parent?: Maybe<Comment>;
  repliesCount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CompanionRequest = {
  __typename?: 'CompanionRequest';
  _id: Scalars['ID']['output'];
  receiver: User;
  sender: User;
  status: Scalars['String']['output'];
};

export type CompanionsResponse = {
  __typename?: 'CompanionsResponse';
  companions: Array<User>;
  totalCompanions: Scalars['Int']['output'];
};

export type CreateCategoryInput = {
  categories: Array<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  ownerType: OwnerType;
  parent?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateEventInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizer?: InputMaybe<Scalars['ID']['input']>;
  privacy: Privacy;
  startDate: Scalars['DateTime']['input'];
  time?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInterestInput = {
  interests: Array<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
};

export type CreateLocationInput = {
  geometry: LocationGeometryInput;
  properties: LocationPropertiesInput;
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissionIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreateTagInput = {
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID']['output'];
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  interest?: Maybe<Interest>;
  location?: Maybe<Location>;
  name: Scalars['String']['output'];
  organizer: User;
  privacy: Privacy;
  startDate: Scalars['DateTime']['output'];
  tag?: Maybe<Tag>;
  time?: Maybe<Scalars['String']['output']>;
};

export type EventRelationsInput = {
  category?: InputMaybe<CreateCategoryInput>;
  interest?: InputMaybe<CreateInterestInput>;
  location?: InputMaybe<CreateLocationInput>;
  tag?: InputMaybe<CreateTagInput>;
};

export type Interest = {
  __typename?: 'Interest';
  _id: Scalars['ID']['output'];
  interests: Array<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['ID']['output']>;
  ownerType?: Maybe<Scalars['String']['output']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  _id: Scalars['ID']['output'];
  event: Event;
  sender: User;
};

export type Invited = {
  __typename?: 'Invited';
  _id: Scalars['ID']['output'];
  invitation?: Maybe<Invitation>;
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  user: User;
};

export type Join = {
  __typename?: 'Join';
  _id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
  user: Scalars['ID']['output'];
};

export type Like = {
  __typename?: 'Like';
  _id: Scalars['ID']['output'];
  ownerId: Scalars['ID']['output'];
  ownerType: Scalars['String']['output'];
  user: Scalars['ID']['output'];
};

export type LikeStatus = {
  __typename?: 'LikeStatus';
  count: Scalars['Int']['output'];
  isLiked: Scalars['Boolean']['output'];
  ownerId: Scalars['ID']['output'];
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
  ownerId: Scalars['String']['output'];
  ownerType: Scalars['String']['output'];
};

export type LocationPropertiesInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptCompanionRequest: CompanionRequest;
  acceptInvitation: Invited;
  addPermissionToRole: Role;
  /** добавать роль пользователю */
  addUserRole: User;
  createCategories: Category;
  createComment: Comment;
  /** Создать событие */
  createEvent: Event;
  createInterest: Interest;
  /** Создать локацию */
  createLocation: Location;
  createReply: Comment;
  /** Creates missing CRUD permissions for a specific resource based on Action enum */
  createResourcePermissions: Array<Permission>;
  createRole: Role;
  createTag: Tag;
  /** Создать пользователя */
  createUser: User;
  declineInvitation: Invited;
  /** Удалить файл из хранилища по его ключу */
  deleteFile: Scalars['Boolean']['output'];
  /** Получить пресайнд-ссылку для прямой загрузки файла в MinIO/S3 */
  getPresignedUrl: PresignedUrlResponse;
  registerResource: Resource;
  rejectCompanionRequest: CompanionRequest;
  removeCategories: Scalars['Boolean']['output'];
  removeComment: Scalars['Boolean']['output'];
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
  /** Генерация событий от разных пользователей (доступно только в DEV режиме) */
  seedEvents: Event;
  /** Генерация тестовых данных (доступно только в DEV режиме) */
  seedUsers: SeedUserResult;
  sendInvitation: Invitation;
  sendRequestCompanion: CompanionRequest;
  toggleJoin: Scalars['Boolean']['output'];
  toggleLike: Scalars['Boolean']['output'];
  /** Переключает статус активности права (включает/выключает) */
  togglePermissionStatus: Permission;
  updateCategories: Category;
  updateComment: Comment;
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


export type MutationAcceptInvitationArgs = {
  invitationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
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


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateEventArgs = {
  createCategoryInput?: InputMaybe<CreateCategoryInput>;
  createEventInput: CreateEventInput;
  createInterestInput?: InputMaybe<CreateInterestInput>;
  createLocationInput?: InputMaybe<CreateLocationInput>;
  createTagInput?: InputMaybe<CreateTagInput>;
};


export type MutationCreateInterestArgs = {
  createInterestInput: CreateInterestInput;
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
};


export type MutationCreateReplyArgs = {
  createCommentInput: CreateCommentInput;
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


export type MutationDeclineInvitationArgs = {
  invitationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteFileArgs = {
  fileKey: Scalars['String']['input'];
};


export type MutationGetPresignedUrlArgs = {
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
  category_id: Scalars['ID']['input'];
};


export type MutationRemoveCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationRemoveCompanionArgs = {
  companion_id: Scalars['ID']['input'];
  user_id: Scalars['ID']['input'];
};


export type MutationRemoveEventArgs = {
  event_id: Scalars['ID']['input'];
};


export type MutationRemoveInterestArgs = {
  interest_id: Scalars['ID']['input'];
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
  tag_id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserRoleArgs = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationSeedEventsArgs = {
  inputs: SeedEventsInput;
};


export type MutationSeedUsersArgs = {
  inputs: SeedUserInput;
};


export type MutationSendInvitationArgs = {
  input: SendInvitationInput;
};


export type MutationSendRequestCompanionArgs = {
  receiver: Scalars['ID']['input'];
};


export type MutationToggleJoinArgs = {
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
};


export type MutationToggleLikeArgs = {
  ownerId: Scalars['ID']['input'];
  ownerType: Scalars['String']['input'];
};


export type MutationTogglePermissionStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoriesArgs = {
  category_id: Scalars['ID']['input'];
  updateCategoriesInput: UpdateCategoryInput;
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['ID']['input'];
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateEventArgs = {
  createCategoryInput?: InputMaybe<CreateCategoryInput>;
  createInterestInput?: InputMaybe<CreateInterestInput>;
  createLocationInput?: InputMaybe<CreateLocationInput>;
  createTagInput?: InputMaybe<CreateTagInput>;
  event_id: Scalars['ID']['input'];
  updateEventInput: UpdateEventInput;
};


export type MutationUpdateInterestArgs = {
  interest_id: Scalars['ID']['input'];
  updateInterestInput: UpdateInterestInput;
};


export type MutationUpdateLocationArgs = {
  location_id: Scalars['ID']['input'];
  updateLocationInput: UpdateLocationInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateTagArgs = {
  tag_id: Scalars['ID']['input'];
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

export enum OwnerType {
  Comment = 'COMMENT',
  Event = 'EVENT',
  Trip = 'TRIP',
  User = 'USER'
}

export type Permission = {
  __typename?: 'Permission';
  _id: Scalars['ID']['output'];
  action: Action;
  description?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  resource: Resource;
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

export enum Privacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  adminRoute: Scalars['String']['output'];
  /** Поиск категорий по id */
  categoriesById: Category;
  /** Поиск категорий по ownerId */
  categoriesByOwnerId: Category;
  companionInvitationEvent: Array<Event>;
  /** Поиск компаньонов по ownerId */
  companionsByOwnerId: CompanionsResponse;
  /** Найти пользователей по email или имени */
  findByEmailOrName: Array<User>;
  /** Поиск компаньонов по email или имени */
  findCompanion: Array<User>;
  /** Получить все активные события с пагинацией и сортировкой */
  getAllEvents: Array<Event>;
  getChildrenCommentsByParentId: Array<Comment>;
  getCommentsByOwnerId: Array<Comment>;
  getCompanionRequests: Array<CompanionRequest>;
  getDeclinedEvents: Array<Event>;
  /** Получить событие по id */
  getEventById: Event;
  /** Получить все события организатора */
  getEventsByOrganizer: Array<Event>;
  getInvitation: Array<Invited>;
  getJoinedUsersByOwnerId: Array<Join>;
  getLikesBatch: Array<LikeStatus>;
  getLikesByOwnerId: Array<Like>;
  getLikesCount: Scalars['Int']['output'];
  getParentCommentsByOwnerId: Array<Comment>;
  /** Поиск интересов по id */
  interestById: Interest;
  /** Поиск интересов по ownerId */
  interestByOwnerId: Interest;
  isJoinedByUser?: Maybe<Scalars['Boolean']['output']>;
  isLikedByUser?: Maybe<Scalars['Boolean']['output']>;
  /** Поиск места по id */
  locationById: Location;
  /** Поиск места по ownerId */
  locationByOwnerId: Location;
  moderatorRoute: Scalars['String']['output'];
  /** Поиск права по id */
  permissionById?: Maybe<Permission>;
  /** Поиск права по названию */
  permissionByName: Permission;
  /** Получить все права */
  permissions: Array<Permission>;
  resourceBySlug?: Maybe<Resource>;
  /** Список всех зарегистрированных ресурсов */
  resources: Array<Resource>;
  /** Поиск роли по id */
  roleById?: Maybe<Role>;
  /** Поиск роли по названию */
  roleByName: Role;
  /** Поиск роли по id пользователя */
  roleByUserId?: Maybe<User>;
  /** Получить все роли */
  roles: Array<Role>;
  /** Поиск ресурсов по названию или слагу для управления ролями */
  searchResources: Array<Resource>;
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
  category_id: Scalars['ID']['input'];
};


export type QueryCategoriesByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryCompanionInvitationEventArgs = {
  event_id?: InputMaybe<Scalars['ID']['input']>;
  organizer_id: Scalars['ID']['input'];
};


export type QueryCompanionsByOwnerIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ownerId: Scalars['ID']['input'];
};


export type QueryFindByEmailOrNameArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindCompanionArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetChildrenCommentsByParentIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  parentId: Scalars['ID']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCommentsByOwnerIdArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  ownerId: Scalars['ID']['input'];
};


export type QueryGetCompanionRequestsArgs = {
  user_id: Scalars['ID']['input'];
};


export type QueryGetDeclinedEventsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetEventByIdArgs = {
  event_id: Scalars['ID']['input'];
};


export type QueryGetEventsByOrganizerArgs = {
  organizer_id: Scalars['ID']['input'];
};


export type QueryGetInvitationArgs = {
  user_id: Scalars['ID']['input'];
};


export type QueryGetJoinedUsersByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryGetLikesBatchArgs = {
  ownerIds: Array<Scalars['ID']['input']>;
};


export type QueryGetLikesByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryGetLikesCountArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryGetParentCommentsByOwnerIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ownerId: Scalars['ID']['input'];
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInterestByIdArgs = {
  interest_id: Scalars['ID']['input'];
};


export type QueryInterestByOwnerIdArgs = {
  ownerId: Scalars['ID']['input'];
};


export type QueryIsJoinedByUserArgs = {
  owner_id: Scalars['ID']['input'];
};


export type QueryIsLikedByUserArgs = {
  owner_id: Scalars['ID']['input'];
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
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagByIdArgs = {
  tag_id: Scalars['ID']['input'];
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
  __typename?: 'Resource';
  _id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
  slug: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions: Array<Permission>;
};

export type SeedEventsInput = {
  event: CreateEventInput;
  organizer: Scalars['ID']['input'];
  relations?: InputMaybe<EventRelationsInput>;
};

export type SeedUserInput = {
  category?: InputMaybe<CreateCategoryInput>;
  interest?: InputMaybe<CreateInterestInput>;
  location?: InputMaybe<CreateLocationInput>;
  tag?: InputMaybe<CreateTagInput>;
  user?: InputMaybe<CreateUserInput>;
};

export type SeedUserResult = {
  __typename?: 'SeedUserResult';
  category?: Maybe<Category>;
  interest?: Maybe<Interest>;
  location?: Maybe<Location>;
  tag?: Maybe<Tag>;
  user?: Maybe<User>;
};

export type SendInvitationInput = {
  eventId: Scalars['ID']['input'];
  receiverIds: Array<Scalars['ID']['input']>;
  senderId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  sendRequestCompanion: CompanionRequest;
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID']['output'];
  ownerId?: Maybe<Scalars['ID']['output']>;
  ownerType?: Maybe<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
};

export type UpdateCategoryInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<OwnerType>;
  parent?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateEventInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizer?: InputMaybe<Scalars['ID']['input']>;
  privacy?: InputMaybe<Privacy>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInterestInput = {
  interests?: InputMaybe<Array<Scalars['String']['input']>>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLocationInput = {
  geometry?: InputMaybe<LocationGeometryInput>;
  properties?: InputMaybe<LocationPropertiesInput>;
};

export type UpdateRoleInput = {
  _id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateTagInput = {
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  ownerType?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  _id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UploadFileInput = {
  /** Оригинальное имя файла */
  fileName: Scalars['String']['input'];
  /** MIME-тип файла */
  fileType: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
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

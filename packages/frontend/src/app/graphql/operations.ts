/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Action =
  | 'CREATE'
  | 'DELETE'
  | 'EDIT'
  | 'READ';

export type CreateCategoryInput = {
  categories: Array<string>;
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
};

export type CreateCommentInput = {
  content: string;
  ownerId: string | number;
  ownerType: OwnerType;
  parent?: string | number | null | undefined;
};

export type CreateEventInput = {
  description?: string | null | undefined;
  endDate: string;
  image?: string | null | undefined;
  name: string;
  organizer?: string | number | null | undefined;
  privacy: Privacy;
  startDate: string;
  time?: string | null | undefined;
};

export type CreateInterestInput = {
  interests: Array<string>;
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
};

export type CreateLocationInput = {
  geometry: LocationGeometryInput;
  properties: LocationPropertiesInput;
};

export type CreateRoleInput = {
  description?: string | null | undefined;
  name: string;
  permissionIds?: Array<string | null | undefined> | null | undefined;
};

export type CreateTagInput = {
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
  tags?: Array<string> | null | undefined;
};

export type CreateUserInput = {
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  roles?: Array<string> | null | undefined;
};

export type EventRelationsInput = {
  category?: CreateCategoryInput | null | undefined;
  interest?: CreateInterestInput | null | undefined;
  location?: CreateLocationInput | null | undefined;
  tag?: CreateTagInput | null | undefined;
};

export type LocationGeometryInput = {
  coordinates: Array<number>;
};

export type LocationPropertiesInput = {
  address?: string | null | undefined;
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
};

export type OwnerType =
  | 'COMMENT'
  | 'EVENT'
  | 'TRIP'
  | 'USER';

export type Privacy =
  | 'PRIVATE'
  | 'PUBLIC';

export type PrivacyVisibility =
  | 'COMPANIONS'
  | 'EVERYONE'
  | 'MARKED_COMPANIONS';

export type SeedEventsInput = {
  event: CreateEventInput;
  organizer: string | number;
  relations?: EventRelationsInput | null | undefined;
};

export type SeedUserInput = {
  category?: CreateCategoryInput | null | undefined;
  interest?: CreateInterestInput | null | undefined;
  location?: CreateLocationInput | null | undefined;
  tag?: CreateTagInput | null | undefined;
  user?: CreateUserInput | null | undefined;
};

export type SendInvitationInput = {
  eventId: string | number;
  receiverIds: Array<string | number>;
  senderId: string | number;
};

export type UpdateCategoryInput = {
  categories?: Array<string> | null | undefined;
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
};

export type UpdateEventInput = {
  description?: string | null | undefined;
  endDate?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
  organizer?: string | number | null | undefined;
  privacy?: Privacy | null | undefined;
  startDate?: string | null | undefined;
  time?: string | null | undefined;
};

export type UpdateInterestInput = {
  interests?: Array<string> | null | undefined;
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
};

export type UpdateLocationInput = {
  geometry?: LocationGeometryInput | null | undefined;
  properties?: LocationPropertiesInput | null | undefined;
};

export type UpdatePrivacySettingInput = {
  markedForWhoCanInviteToEvents?: Array<string | number> | null | undefined;
  markedForWhoCanSeeEvents?: Array<string | number> | null | undefined;
  whoCanInviteToEvents?: PrivacyVisibility | null | undefined;
  whoCanSeeEvents?: PrivacyVisibility | null | undefined;
};

export type UpdateRoleInput = {
  _id: string;
  description?: string | null | undefined;
  name?: string | null | undefined;
  permissionIds?: Array<string> | null | undefined;
};

export type UpdateTagInput = {
  ownerId?: string | number | null | undefined;
  ownerType?: string | null | undefined;
  tags?: Array<string> | null | undefined;
};

export type UpdateUserInput = {
  _id: string | number;
  description?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  image?: string | null | undefined;
  lastName?: string | null | undefined;
  roles?: Array<string> | null | undefined;
};

export type UploadFileInput = {
  /** Оригинальное имя файла */
  fileName: string;
  /** MIME-тип файла */
  fileType: string;
};

export type CreateCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename: 'Mutation', createComment: { __typename: 'Comment', _id: string, ownerId: string, ownerType: string, content: string, createdAt: string, repliesCount: number, author: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null } } };

export type CreateReplyMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateReplyMutation = { __typename: 'Mutation', createReply: { __typename: 'Comment', _id: string, ownerId: string, content: string, repliesCount: number, author: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }, parent: { __typename: 'Comment', _id: string, author: { __typename: 'User', firstName: string, lastName: string } } | null } };

export type RemoveCommentMutationVariables = Exact<{
  commentId: string | number;
}>;


export type RemoveCommentMutation = { __typename: 'Mutation', removeComment: boolean };

export type SendRequestCompanionMutationVariables = Exact<{
  receiver: string | number;
}>;


export type SendRequestCompanionMutation = { __typename: 'Mutation', sendRequestCompanion: { __typename: 'CompanionRequest', _id: string, status: string } };

export type AcceptCompanionRequestMutationVariables = Exact<{
  requestId: string | number;
}>;


export type AcceptCompanionRequestMutation = { __typename: 'Mutation', acceptCompanionRequest: { __typename: 'CompanionRequest', status: string, _id: string } };

export type RejectCompanionRequestMutationVariables = Exact<{
  requestId: string | number;
}>;


export type RejectCompanionRequestMutation = { __typename: 'Mutation', rejectCompanionRequest: { __typename: 'CompanionRequest', _id: string, status: string } };

export type RemoveCompanionMutationVariables = Exact<{
  userId: string | number;
  companionId: string | number;
}>;


export type RemoveCompanionMutation = { __typename: 'Mutation', removeCompanion: boolean };

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput;
  createCategoryInput?: CreateCategoryInput | null | undefined;
  createInterestInput?: CreateInterestInput | null | undefined;
  createLocationInput?: CreateLocationInput | null | undefined;
  createTagInput?: CreateTagInput | null | undefined;
}>;


export type CreateEventMutation = { __typename: 'Mutation', createEvent: { __typename: 'Event', _id: string } };

export type UpdateEventMutationVariables = Exact<{
  updateEventId: string | number;
  updateEventInput: UpdateEventInput;
  createCategoryInput?: CreateCategoryInput | null | undefined;
  createInterestInput?: CreateInterestInput | null | undefined;
  createLocationInput?: CreateLocationInput | null | undefined;
  createTagInput?: CreateTagInput | null | undefined;
}>;


export type UpdateEventMutation = { __typename: 'Mutation', updateEvent: { __typename: 'Event', _id: string } };

export type RemoveEventMutationVariables = Exact<{
  eventId: string | number;
}>;


export type RemoveEventMutation = { __typename: 'Mutation', removeEvent: boolean };

export type SendInvitationMutationVariables = Exact<{
  input: SendInvitationInput;
}>;


export type SendInvitationMutation = { __typename: 'Mutation', sendInvitation: { __typename: 'Invitation', _id: string } };

export type AcceptInvitationMutationVariables = Exact<{
  invitationId: string | number;
  userId: string | number;
}>;


export type AcceptInvitationMutation = { __typename: 'Mutation', acceptInvitation: { __typename: 'Invitation', _id: string, status: string } };

export type DeclineInvitationMutationVariables = Exact<{
  invitationId: string | number;
  userId: string | number;
}>;


export type DeclineInvitationMutation = { __typename: 'Mutation', declineInvitation: { __typename: 'Invitation', _id: string, status: string } };

export type ToggleJoinMutationVariables = Exact<{
  ownerId: string | number;
  ownerType: string;
}>;


export type ToggleJoinMutation = { __typename: 'Mutation', toggleJoin: boolean };

export type ToggleLikeMutationVariables = Exact<{
  ownerId: string | number;
  ownerType: string;
}>;


export type ToggleLikeMutation = { __typename: 'Mutation', toggleLike: boolean };

export type AddMarkedForWhoCanSeeEventsMutationVariables = Exact<{
  companionIds: Array<string | number> | string | number;
}>;


export type AddMarkedForWhoCanSeeEventsMutation = { __typename: 'Mutation', addMarkedForWhoCanSeeEvents: { __typename: 'PrivacySetting', _id: string, markedForWhoCanSeeEvents: Array<string> } };

export type RemoveMarkedForWhoCanSeeEventsMutationVariables = Exact<{
  companionId: string | number;
}>;


export type RemoveMarkedForWhoCanSeeEventsMutation = { __typename: 'Mutation', removeMarkedForWhoCanSeeEvents: { __typename: 'PrivacySetting', _id: string, markedForWhoCanSeeEvents: Array<string> } };

export type AddMarkedForWhoCanInviteToEventsMutationVariables = Exact<{
  companionIds: Array<string | number> | string | number;
}>;


export type AddMarkedForWhoCanInviteToEventsMutation = { __typename: 'Mutation', addMarkedForWhoCanInviteToEvents: { __typename: 'PrivacySetting', _id: string, markedForWhoCanInviteToEvents: Array<string> } };

export type RemoveMarkedForWhoCanInviteToEventsMutationVariables = Exact<{
  companionId: string | number;
}>;


export type RemoveMarkedForWhoCanInviteToEventsMutation = { __typename: 'Mutation', removeMarkedForWhoCanInviteToEvents: { __typename: 'PrivacySetting', _id: string, markedForWhoCanInviteToEvents: Array<string> } };

export type CreateResourcePermissionsMutationVariables = Exact<{
  resourceId: string | number;
}>;


export type CreateResourcePermissionsMutation = { __typename: 'Mutation', createResourcePermissions: Array<{ __typename: 'Permission', _id: string, action: Action, isActive: boolean, name: string }> };

export type TogglePermissionStatusMutationVariables = Exact<{
  togglePermissionStatusId: string | number;
}>;


export type TogglePermissionStatusMutation = { __typename: 'Mutation', togglePermissionStatus: { __typename: 'Permission', _id: string, name: string, isActive: boolean } };

export type UpdatePrivacySettingMutationVariables = Exact<{
  input: UpdatePrivacySettingInput;
}>;


export type UpdatePrivacySettingMutation = { __typename: 'Mutation', updatePrivacySetting: { __typename: 'PrivacySetting', _id: string, whoCanSeeEvents: PrivacyVisibility, whoCanInviteToEvents: PrivacyVisibility, markedForWhoCanSeeEvents: Array<string>, markedForWhoCanInviteToEvents: Array<string> } };

export type CreateRoleMutationVariables = Exact<{
  createRoleInput: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename: 'Mutation', createRole: { __typename: 'Role', _id: string, name: string, permissions: Array<{ __typename: 'Permission', _id: string, name: string, action: Action }> } };

export type UpdateRoleMutationVariables = Exact<{
  updateRoleInput: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename: 'Mutation', updateRole: { __typename: 'Role', _id: string, description: string | null, name: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, name: string, resource: { __typename: 'Resource', _id: string, name: string, slug: string } }> } };

export type RemoveRoleMutationVariables = Exact<{
  removeRoleId: string | number;
}>;


export type RemoveRoleMutation = { __typename: 'Mutation', removeRole: boolean };

export type AddPermissionToRoleMutationVariables = Exact<{
  permissionId: Array<string | number> | string | number;
  roleId: string | number;
}>;


export type AddPermissionToRoleMutation = { __typename: 'Mutation', addPermissionToRole: { __typename: 'Role', _id: string, description: string | null, name: string, permissions: Array<{ __typename: 'Permission', _id: string }> } };

export type RemovePermissionFromRoleMutationVariables = Exact<{
  permissionId: string | number;
  roleId: string | number;
}>;


export type RemovePermissionFromRoleMutation = { __typename: 'Mutation', removePermissionFromRole: { __typename: 'Role', name: string, _id: string, description: string | null, permissions: Array<{ __typename: 'Permission', name: string, _id: string }> } };

export type SeedEventsMutationVariables = Exact<{
  inputs: SeedEventsInput;
}>;


export type SeedEventsMutation = { __typename: 'Mutation', seedEvents: { __typename: 'Event', _id: string } };

export type SeedUsersMutationVariables = Exact<{
  inputs: SeedUserInput;
}>;


export type SeedUsersMutation = { __typename: 'Mutation', seedUsers: { __typename: 'SeedUserResult', category: { __typename: 'Category', _id: string, categories: Array<string>, ownerId: string | null, ownerType: string | null } | null, interest: { __typename: 'Interest', _id: string, interests: Array<string>, ownerId: string | null, ownerType: string | null } | null, location: { __typename: 'Location', _id: string, type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null, ownerId: string, ownerType: string } } | null, tag: { __typename: 'Tag', _id: string, ownerId: string | null, ownerType: string | null, tags: Array<string> } | null, user: { __typename: 'User', _id: string, description: string | null, email: string, firstName: string, image: string | null, lastName: string } | null } };

export type MutationMutationVariables = Exact<{
  userId: string | number;
  categoryId?: string | number | null | undefined;
  createCategoryInput?: CreateCategoryInput | null | undefined;
  updateUserInput?: UpdateUserInput | null | undefined;
  createInterestInput?: CreateInterestInput | null | undefined;
  createLocationInput?: CreateLocationInput | null | undefined;
  interestId?: string | number | null | undefined;
  locationId?: string | number | null | undefined;
  updateCategoryInput?: UpdateCategoryInput | null | undefined;
  updateInterestInput?: UpdateInterestInput | null | undefined;
  updateLocationInput?: UpdateLocationInput | null | undefined;
  createTagInput?: CreateTagInput | null | undefined;
  tagId?: string | number | null | undefined;
  updateTagInput?: UpdateTagInput | null | undefined;
}>;


export type MutationMutation = { __typename: 'Mutation', updateUserProfile: { __typename: 'UserProfile', category: { __typename: 'Category', _id: string, categories: Array<string>, ownerId: string | null, ownerType: string | null } | null, interest: { __typename: 'Interest', _id: string, interests: Array<string>, ownerId: string | null, ownerType: string | null } | null, location: { __typename: 'Location', _id: string, type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename: 'LocationProperties', address: string | null, ownerId: string, ownerType: string } } | null, user: { __typename: 'User', description: string | null, email: string, firstName: string, image: string | null, lastName: string }, tag: { __typename: 'Tag', _id: string, ownerId: string | null, ownerType: string | null, tags: Array<string> } | null } };

export type GetPresignedUrlMutationVariables = Exact<{
  input: UploadFileInput;
  folder: string;
}>;


export type GetPresignedUrlMutation = { __typename: 'Mutation', getPresignedUrl: { __typename: 'PresignedUrlResponse', presignedUrl: string, publicUrl: string } };

export type DeleteFileMutationVariables = Exact<{
  fileKey: string;
}>;


export type DeleteFileMutation = { __typename: 'Mutation', deleteFile: boolean };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: string | number;
  user: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename: 'Mutation', updateUser: { __typename: 'User', _id: string, firstName: string, lastName: string, email: string, description: string | null, image: string | null, roles: Array<{ __typename: 'Role', _id: string, name: string }> | null } };

export type AddUserRoleMutationVariables = Exact<{
  userId: string | number;
  roleName: string;
}>;


export type AddUserRoleMutation = { __typename: 'Mutation', addUserRole: { __typename: 'User', _id: string, firstName: string, lastName: string, email: string, roles: Array<{ __typename: 'Role', _id: string, name: string }> | null } };

export type RemoveUserRoleMutationVariables = Exact<{
  userId: string | number;
  roleName: string;
}>;


export type RemoveUserRoleMutation = { __typename: 'Mutation', removeUserRole: { __typename: 'User', _id: string, firstName: string, lastName: string, email: string, roles: Array<{ __typename: 'Role', _id: string, name: string }> | null } };

export type RemoveUserMutationVariables = Exact<{
  id: string | number;
}>;


export type RemoveUserMutation = { __typename: 'Mutation', removeUser: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename: 'Mutation', createUser: { __typename: 'User', _id: string, firstName: string, lastName: string, email: string, image: string | null } };

export type GetCommentsByOwnerIdQueryVariables = Exact<{
  ownerId: string | number;
  offset: number;
  limit: number;
}>;


export type GetCommentsByOwnerIdQuery = { __typename: 'Query', getCommentsByOwnerId: Array<{ __typename: 'Comment', _id: string, content: string, createdAt: string, ownerId: string, deleted: boolean, author: { __typename: 'User', _id: string, image: string | null, firstName: string, lastName: string }, parent: { __typename: 'Comment', _id: string, author: { __typename: 'User', firstName: string, lastName: string } } | null }> };

export type GetParentCommentsByOwnerIdQueryVariables = Exact<{
  limit?: number | null | undefined;
  offset?: number | null | undefined;
  ownerId: string | number;
  sort?: string | null | undefined;
}>;


export type GetParentCommentsByOwnerIdQuery = { __typename: 'Query', getParentCommentsByOwnerId: Array<{ __typename: 'Comment', _id: string, content: string, createdAt: string, ownerId: string, repliesCount: number, deleted: boolean, author: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }, parent: { __typename: 'Comment', _id: string } | null }> };

export type GetChildrenCommentsByParentIdQueryVariables = Exact<{
  limit?: number | null | undefined;
  offset?: number | null | undefined;
  parentId: string | number;
  sort?: string | null | undefined;
}>;


export type GetChildrenCommentsByParentIdQuery = { __typename: 'Query', getChildrenCommentsByParentId: Array<{ __typename: 'Comment', _id: string, content: string, createdAt: string, ownerId: string, repliesCount: number, deleted: boolean, author: { __typename: 'User', firstName: string, lastName: string, image: string | null, _id: string }, parent: { __typename: 'Comment', _id: string, author: { __typename: 'User', firstName: string, lastName: string } } | null }> };

export type GetCompanionRequestsQueryVariables = Exact<{
  userId: string | number;
}>;


export type GetCompanionRequestsQuery = { __typename: 'Query', getCompanionRequests: Array<{ __typename: 'CompanionRequest', _id: string, status: string, receiver: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }, sender: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null } }> };

export type CompanionsByOwnerIdQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type CompanionsByOwnerIdQuery = { __typename: 'Query', companionsByOwnerId: { __typename: 'CompanionsResponse', totalCompanions: number, companions: Array<{ __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }> } };

export type FindCompanionQueryVariables = Exact<{
  query?: string | null | undefined;
}>;


export type FindCompanionQuery = { __typename: 'Query', findCompanion: Array<{ __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }> };

export type IsUserCompanionQueryVariables = Exact<{
  userId: string | number;
  companionId: string | number;
}>;


export type IsUserCompanionQuery = { __typename: 'Query', isUserCompanion: boolean };

export type GetAllEventsQueryVariables = Exact<{
  limit?: number | null | undefined;
  offset?: number | null | undefined;
  sort?: string | null | undefined;
}>;


export type GetAllEventsQuery = { __typename: 'Query', getAllEvents: Array<{ __typename: 'Event', _id: string, description: string | null, endDate: string | null, image: string | null, name: string, privacy: Privacy, startDate: string, time: string | null, category: { __typename: 'Category', categories: Array<string> } | null, interest: { __typename: 'Interest', interests: Array<string> } | null, location: { __typename: 'Location', geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null, organizer: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }, tag: { __typename: 'Tag', tags: Array<string> } | null }> };

export type GetEventsByOrganizerQueryVariables = Exact<{
  organizerId: string | number;
}>;


export type GetEventsByOrganizerQuery = { __typename: 'Query', getEventsByOrganizer: Array<{ __typename: 'Event', _id: string, description: string | null, endDate: string | null, image: string | null, name: string, privacy: Privacy, startDate: string, time: string | null, category: { __typename: 'Category', categories: Array<string> } | null, interest: { __typename: 'Interest', interests: Array<string> } | null, location: { __typename: 'Location', geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null, organizer: { __typename: 'User', _id: string, firstName: string, image: string | null, lastName: string }, tag: { __typename: 'Tag', tags: Array<string> } | null }> };

export type GetEventByIdQueryVariables = Exact<{
  eventId: string | number;
}>;


export type GetEventByIdQuery = { __typename: 'Query', getEventById: { __typename: 'Event', _id: string, description: string | null, endDate: string | null, image: string | null, name: string, privacy: Privacy, startDate: string, time: string | null, category: { __typename: 'Category', categories: Array<string> } | null, interest: { __typename: 'Interest', interests: Array<string> } | null, location: { __typename: 'Location', geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null, tag: { __typename: 'Tag', tags: Array<string> } | null, organizer: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null } } };

export type GetInvitationQueryVariables = Exact<{
  user_id: string | number;
}>;


export type GetInvitationQuery = { __typename: 'Query', getInvitation: Array<{ __typename: 'Invitation', _id: string, status: string, event: { __typename: 'Event', _id: string, name: string, image: string | null, time: string | null, startDate: string, location: { __typename: 'Location', type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null, organizer: { __typename: 'User', firstName: string, _id: string } }, sender: { __typename: 'User', _id: string, firstName: string }, receiver: { __typename: 'User', _id: string } }> };

export type GetDeclinedEventsQueryVariables = Exact<{
  userId: string | number;
}>;


export type GetDeclinedEventsQuery = { __typename: 'Query', events: Array<{ __typename: 'Event', _id: string, name: string, description: string | null, startDate: string, time: string | null, image: string | null, location: { __typename: 'Location', type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null }> };

export type CompanionInvitationEventQueryVariables = Exact<{
  organizerId: string | number;
  companionId: string | number;
}>;


export type CompanionInvitationEventQuery = { __typename: 'Query', companionInvitationEvent: Array<{ __typename: 'Event', _id: string, name: string, startDate: string }> };

export type GetOrganizerEventsForInviteQueryVariables = Exact<{
  organizerId: string | number;
}>;


export type GetOrganizerEventsForInviteQuery = { __typename: 'Query', events: Array<{ __typename: 'Event', _id: string, name: string, startDate: string }> };

export type IsJoinedByUserQueryVariables = Exact<{
  ownerId: string | number;
}>;


export type IsJoinedByUserQuery = { __typename: 'Query', isJoinedByUser: boolean | null };

export type GetJoinedUsersByOwnerIdQueryVariables = Exact<{
  ownerId: string | number;
}>;


export type GetJoinedUsersByOwnerIdQuery = { __typename: 'Query', getJoinedUsersByOwnerId: Array<{ __typename: 'Join', _id: string, ownerId: string, ownerType: string, user: string }> };

export type IsLikedByUserQueryVariables = Exact<{
  ownerId: string | number;
}>;


export type IsLikedByUserQuery = { __typename: 'Query', isLikedByUser: boolean | null };

export type GetLikesCountQueryVariables = Exact<{
  ownerId: string | number;
}>;


export type GetLikesCountQuery = { __typename: 'Query', getLikesCount: number };

export type GetLikesBatchQueryVariables = Exact<{
  ownerIds: Array<string | number> | string | number;
}>;


export type GetLikesBatchQuery = { __typename: 'Query', getLikesBatch: Array<{ __typename: 'LikeStatus', ownerId: string, count: number, isLiked: boolean }> };

export type LocationByIdQueryVariables = Exact<{
  locationById: string | number;
}>;


export type LocationByIdQuery = { __typename: 'Query', locationById: { __typename: 'Location', _id: string, type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename: 'LocationProperties', address: string | null, ownerId: string, ownerType: string } } };

export type LocationByOwnerIdQueryVariables = Exact<{
  ownerId: string | number;
}>;


export type LocationByOwnerIdQuery = { __typename: 'Query', locationByOwnerId: { __typename: 'Location', _id: string, type: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number>, type: string }, properties: { __typename: 'LocationProperties', address: string | null, ownerId: string, ownerType: string } } };

export type GetMarkedForWhoCanSeeEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarkedForWhoCanSeeEventsQuery = { __typename: 'Query', myPrivacySetting: { __typename: 'PrivacySetting', _id: string, markedForWhoCanSeeEvents: Array<string> } };

export type GetMarkedForWhoCanInviteToEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarkedForWhoCanInviteToEventsQuery = { __typename: 'Query', myPrivacySetting: { __typename: 'PrivacySetting', _id: string, markedForWhoCanInviteToEvents: Array<string> } };

export type PermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionsQuery = { __typename: 'Query', permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, isActive: boolean, name: string, resource: { __typename: 'Resource', name: string } }> };

export type MyPrivacySettingQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPrivacySettingQuery = { __typename: 'Query', myPrivacySetting: { __typename: 'PrivacySetting', _id: string, whoCanSeeEvents: PrivacyVisibility, whoCanInviteToEvents: PrivacyVisibility, markedForWhoCanSeeEvents: Array<string>, markedForWhoCanInviteToEvents: Array<string> } };

export type PrivacySettingsForUsersQueryVariables = Exact<{
  userIds: Array<string | number> | string | number;
}>;


export type PrivacySettingsForUsersQuery = { __typename: 'Query', privacySettingsForUsers: Array<{ __typename: 'PrivacySetting', _id: string, ownerId: string, whoCanSeeEvents: PrivacyVisibility, whoCanInviteToEvents: PrivacyVisibility, markedForWhoCanSeeEvents: Array<string>, markedForWhoCanInviteToEvents: Array<string> }> };

export type PrivacySettingByUserIdQueryVariables = Exact<{
  userId: string | number;
}>;


export type PrivacySettingByUserIdQuery = { __typename: 'Query', privacySettingByUserId: { __typename: 'PrivacySetting', _id: string, whoCanSeeEvents: PrivacyVisibility, whoCanInviteToEvents: PrivacyVisibility, markedForWhoCanSeeEvents: Array<string>, markedForWhoCanInviteToEvents: Array<string> } };

export type ResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourcesQuery = { __typename: 'Query', resources: Array<{ __typename: 'Resource', _id: string, name: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, isActive: boolean, name: string }> }> };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename: 'Query', roles: Array<{ __typename: 'Role', _id: string, description: string | null, name: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, description: string | null, name: string, resource: { __typename: 'Resource', _id: string, name: string, slug: string } }> }> };

export type RoleByUserIdQueryVariables = Exact<{
  userId: string | number;
}>;


export type RoleByUserIdQuery = { __typename: 'Query', roleByUserId: { __typename: 'User', roles: Array<{ __typename: 'Role', name: string }> | null } | null };

export type RoleByNameQueryVariables = Exact<{
  name: string;
}>;


export type RoleByNameQuery = { __typename: 'Query', roleByName: { __typename: 'Role', _id: string, name: string } };

export type SearchResourcesQueryVariables = Exact<{
  query?: string | null | undefined;
}>;


export type SearchResourcesQuery = { __typename: 'Query', searchResources: Array<{ __typename: 'Resource', _id: string, name: string, slug: string, permissions: Array<{ __typename: 'Permission', _id: string, action: Action, name: string, description: string | null, isActive: boolean }> }> };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename: 'Query', session: { __typename: 'User', _id: string, firstName: string, lastName: string, email: string, image: string | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  userId: string | number;
}>;


export type GetUserByIdQuery = { __typename: 'Query', user: { __typename: 'User', _id: string, description: string | null, email: string, firstName: string, image: string | null, lastName: string, roles: Array<{ __typename: 'Role', _id: string, name: string }> | null } };

export type UserProfileQueryVariables = Exact<{
  userId: string | number;
}>;


export type UserProfileQuery = { __typename: 'Query', userProfile: { __typename: 'UserProfile', tag: { __typename: 'Tag', tags: Array<string>, _id: string } | null, category: { __typename: 'Category', _id: string, categories: Array<string> } | null, interest: { __typename: 'Interest', _id: string, interests: Array<string> } | null, location: { __typename: 'Location', _id: string, geometry: { __typename: 'LocationGeometry', coordinates: Array<number> }, properties: { __typename: 'LocationProperties', address: string | null } } | null, user: { __typename: 'User', _id: string, description: string | null, email: string, firstName: string, image: string | null, lastName: string } } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename: 'Query', users: Array<{ __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }> };

export type FindByEmailOrNameQueryVariables = Exact<{
  query?: string | null | undefined;
}>;


export type FindByEmailOrNameQuery = { __typename: 'Query', findByEmailOrName: Array<{ __typename: 'User', _id: string, firstName: string, lastName: string, email: string, image: string | null }> };

export type SubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionSubscription = { __typename: 'Subscription', sendRequestCompanion: { __typename: 'CompanionRequest', _id: string, status: string, receiver: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null }, sender: { __typename: 'User', _id: string, firstName: string, lastName: string, image: string | null } } };

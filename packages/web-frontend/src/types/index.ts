// TypeScript types for GraphQL responses and shared interfaces
// These types match the backend GraphQL schema

export interface IEvent {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  time?: string;
  location?: {
    _id: string;
    coordinates: number[];
    type: string;
    properties?: {
      address?: string;
    };
  };
  image?: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    roles?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileType = 'public' | 'private';

export interface IComment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
  };
  createdAt: string;
  likes?: number;
  parentId?: string;
  replyTo?: {
    id: string;
    userName: string;
  };
  replies?: IComment[];
  replyToList?: string[];
  // Add other fields as needed
}

export interface ITrip {
  _id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  organizer: {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  organizer_id?: string;
  events?: Array<{
    _id: string;
    name?: string;
    description?: string;
  }>;
  events_id?: string[];
  // Add other fields as needed
}

export enum Action {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum Resource {
  USER = 'USER',
  EVENT = 'EVENT',
  TRIP = 'TRIP',
  COMMENT = 'COMMENT',
}

export interface IRole {
  _id: string;
  name: string;
  permissions?: Array<{
    action: Action;
    resource: Resource;
  }>;
  // Add other fields as needed
}

export enum InvitationResponseStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface IInvitation {
  _id: string;
  event_id: string;
  user_id: string;
  status: InvitationResponseStatus;
  // Add other fields as needed
}


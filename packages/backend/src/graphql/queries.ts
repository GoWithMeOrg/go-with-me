import gql from 'graphql-tag';

// Session Query
export const GET_SESSION = gql`
  query GetSession {
    session {
      _id
      firstName
      lastName
      email
      roles
      image
      description
      createdAt
      updatedAt
    }
  }
`;

// Event Queries
// NOTE: EventModule has been added to AppModule
// The schema will be regenerated when the backend starts, and these queries will be validated
// TypeScript errors about "events" and "event" fields will disappear after schema regeneration
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      name
      description
      startDate
      time
      location {
        _id
        coordinates
        type
        properties {
          address
        }
      }
      image
      organizer {
        _id
        firstName
        lastName
        email
        image
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      _id
      name
      description
      startDate
      time
      location {
        _id
        coordinates
        type
        properties {
          address
        }
      }
      image
      organizer {
        _id
        firstName
        lastName
        email
        image
        roles
      }
      createdAt
      updatedAt
    }
  }
`;

// User Queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      firstName
      lastName
      email
      roles
      image
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      firstName
      lastName
      email
      roles
      image
      description
      createdAt
      updatedAt
    }
  }
`;

// Location Queries
export const GET_LOCATION_BY_ID = gql`
  query GetLocationById($id: ID!) {
    locationById(id: $id) {
      _id
      coordinates
      type
      properties {
        address
      }
    }
  }
`;

// Application Queries (placeholders - update when backend implements these)
// NOTE: These are placeholder queries - implement when Application resolver is added
// For now, they're valid GraphQL queries that return empty results
// TODO: Update these when Application resolver is implemented
export const GET_APPLICATIONS = gql`
  query GetApplications {
    __typename
  }
`;

export const GET_APPLICATION = gql`
  query GetApplication($_id: ID!) {
    __typename
  }
`;

// Additional Event Queries
export const GET_ORGANIZER_EVENTS = gql`
  query GetOrganizerEvents($organizerId: ID!) {
    events {
      _id
      name
      description
      startDate
      time
      location {
        _id
        coordinates
        type
        properties {
          address
        }
      }
      image
      organizer {
        _id
        firstName
        lastName
        email
        image
      }
      createdAt
      updatedAt
    }
  }
`;

// User Queries
export const GET_USER_BY_ID = GET_USER; // Alias for compatibility

export const GET_FIND_USERS = gql`
  query FindUsers($search: String) {
    users {
      _id
      firstName
      lastName
      email
      roles
      image
      description
    }
  }
`;

// Liked Queries (placeholders - implement when backend schema is available)
export const LIKED = gql`
  mutation Liked($eventId: ID!, $userId: ID!) {
    __typename
  }
`;

export const GET_LIKED_EVENTS = gql`
  query GetLikedEvents($userId: ID!) {
    __typename
  }
`;

// Joined Queries (placeholders - implement when backend schema is available)
export const JOINED_BY_USER = gql`
  mutation JoinedByUser($eventId: ID!, $userId: ID!) {
    __typename
  }
`;

export const JOINED_BY_USERS = gql`
  query JoinedByUsers($eventId: ID!) {
    __typename
  }
`;

export const GET_JOINED_EVENTS = gql`
  query GetJoinedEvents($userId: ID!) {
    __typename
  }
`;

// Invitation Queries (placeholders - implement when backend schema is available)
export const GET_INVATIONS = gql`
  query GetInvitations($userId: ID!) {
    __typename
  }
`;

export const GET_COMPANION_INVITATION_EVENTS = gql`
  query GetCompanionInvitationEvents($userId: ID!) {
    __typename
  }
`;

export const GET_DECLINED_EVENTS = gql`
  query GetDeclinedEvents($userId: ID!) {
    __typename
  }
`;

// Companion Queries (placeholders - implement when backend schema is available)
export const GET_COMPANIONS = gql`
  query GetCompanions($eventId: ID!) {
    __typename
  }
`;

export const GET_FIND_COMPANION = gql`
  query FindCompanion($search: String) {
    __typename
  }
`;

export const GET_IS_USER_COMPANION = gql`
  query IsUserCompanion($eventId: ID!, $userId: ID!) {
    __typename
  }
`;

// Re-export types from types/index.ts
export type {
  IEvent,
  IUser,
  IComment,
  ITrip,
  IRole,
  IInvitation,
  ProfileType,
  Action,
  Resource,
  InvitationResponseStatus,
} from '../types';

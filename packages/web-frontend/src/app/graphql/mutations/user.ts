import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $user: UpdateUserInput!) {
    updateUser(updateUserId: $updateUserId, user: $user) {
      _id
      name
      email
      image
      location {
        type
        coordinates
        properties {
          address
        }
      }
      description
      categories
      types
      tags
      emailVerified
      updatedAt
    }
  }
`;

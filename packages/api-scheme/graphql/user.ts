import gql from 'graphql-tag';

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
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
    }
  }
`;

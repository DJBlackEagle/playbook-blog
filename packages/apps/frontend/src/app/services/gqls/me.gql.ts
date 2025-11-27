import { gql } from 'apollo-angular';

export const ME = gql`
  query Me {
    me {
      id
      createdAt
      updatedAt
      deletedAt
      deleted
      username
      email
      lastLogin
    }
  }
`;

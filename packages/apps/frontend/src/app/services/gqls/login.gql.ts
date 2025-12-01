import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
      user {
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
  }
`;

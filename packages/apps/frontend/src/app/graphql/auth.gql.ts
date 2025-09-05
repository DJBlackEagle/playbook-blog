import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(loginInput: { identifier: $identifier, password: $password }) {
      accessToken
      user {
        id
        username
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

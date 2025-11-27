import { gql } from 'apollo-angular';

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

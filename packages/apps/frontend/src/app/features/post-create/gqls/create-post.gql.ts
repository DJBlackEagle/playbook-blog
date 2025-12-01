import { gql } from 'apollo-angular';

export const CREATE_POST = gql`
  mutation CreateOnePost($input: CreateOnePostInput!) {
    createOnePost(input: $input) {
      id
    }
  }
`;

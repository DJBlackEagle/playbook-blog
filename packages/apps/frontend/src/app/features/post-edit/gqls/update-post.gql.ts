import { gql } from 'apollo-angular';

export const UPDATE_POST = gql`
  mutation UpdateOnePost($input: UpdateOnePostInput!) {
    updateOnePost(input: $input) {
      id
    }
  }
`;

import { gql } from 'apollo-angular';

export const DELETE_POST_BY_ID = gql`
  mutation DeletePost($id: ID!) {
    deleteOnePost(input: { id: $id }) {
      id
      title
    }
  }
`;

import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query GetPosts(
    $first: Int
    $after: ConnectionCursor
    $last: Int
    $before: ConnectionCursor
    $sorting: [PostSort!]!
  ) {
    posts(
      paging: { first: $first, after: $after, last: $last, before: $before }
      sorting: $sorting
    ) {
      totalCount
      edges {
        node {
          id
          title
          teaser
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      createdAt
      title
      teaser
      content
      sources
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreateOnePostInput!) {
    createOnePost(input: $input) {
      id
      title
    }
  }
`;

import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: ConnectionCursor, $last: Int, $before: ConnectionCursor) {
    posts(paging: { first: $first, after: $after, last: $last, before: $before }) {
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
      title
      teaser
      content
      createdAt
    }
  }
`;

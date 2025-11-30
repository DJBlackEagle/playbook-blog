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

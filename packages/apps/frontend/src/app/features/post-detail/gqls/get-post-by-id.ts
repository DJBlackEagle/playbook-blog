import { gql } from 'apollo-angular';

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      createdAt
      updatedAt
      title
      teaser
      content
      sources
      comments(paging: { first: 5 }, sorting: [{ field: createdAt, direction: DESC }]) {
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
        edges {
          node {
            id
            createdAt
            content
            deleted
            deletedAt
            updatedAt
          }
        }
      }
    }
  }
`;

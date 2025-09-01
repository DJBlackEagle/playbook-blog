# blog

## Create many roles

```graphql
mutation CreateManyRoles {
  createManyRoles(
    input: {
      roles: [
        { name: "ADMIN" description: "Administrator with full system access. Manages users, roles, and all content." }
        { name: "MODERATOR" description: "Content moderator. Can read all posts, update/delete any comments, and manage user reports." }
        { name: "AUTHOR" description: "Content author. Can create, read, update, delete own posts/comments, and read all content." }
        { name: "USER" description: "Standard blog user. Can read all posts and create own comments." }
        { name: "MINIMODERATOR" description: "Mini moderator. Can read all posts, update/delete own comments, and manage user reports." }
      ]
    }
  ) {
    id
    createdAt
    updatedAt
    deletedAt
    deleted
    name
    description
    isSystemRole
  }
}
```

## Create many users

```graphql
mutation CreateManyUsers {
  createManyUsers(
    input: {
      users: [
        { username: "admin", password: "admin1234" }
        { username: "moderator1", password: "moderator1234" }
        { username: "moderator2", password: "moderator1234" }
        { username: "author1", password: "author1234" }
        { username: "author2", password: "author1234" }
        { username: "user1", password: "user1234" }
        { username: "user2", password: "user1234" }
      ]
    }
  ) {
    id
    username
    createdAt
    updatedAt
    lastLogin
    deletedAt
    deleted
  }
}
```

## Create many posts

```graphql
mutation CreateManyPosts {
  createManyPosts(
    input: {
      posts: [
        {
          title: "The Rise of AI in Modern Software Development"
          content: "Artificial intelligence is rapidly transforming how we build and deploy software, offering new tools for automation, analysis, and optimization."
        }
        {
          title: "GraphQL vs. REST: A Developer's Dilemma"
          content: "Choosing between GraphQL and REST for your API can be challenging. This post explores the pros and cons of each approach."
        }
        {
          title: "NestJS: Building Scalable and Maintainable Backends"
          content: "NestJS, a progressive Node.js framework, provides a robust architecture for developing efficient and scalable server-side applications."
        }
      ]
    }
  ) {
    id
    createdAt
    updatedAt
    deletedAt
    deleted
    title
    content
  }
}

```

### Create many comments

```graphql
mutation CreateManyComments {
  createManyComments(
    input: {
      comments: [
        {
          postId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          content: "This is a fascinating article on AI! I agree, it's changing everything."
        }
        {
          postId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          content: "Are there any specific AI tools you recommend for code generation?"
        }
        {
          postId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          content: "Excellent comparison! I've been wrestling with this choice for my new project."
        }
        {
          postId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          content: "NestJS truly simplifies backend development. The modularity is a game-changer!"
        }
      ]
    }
  ) {
    id
    createdAt
    updatedAt
    deletedAt
    deleted
    content
  }
}
```

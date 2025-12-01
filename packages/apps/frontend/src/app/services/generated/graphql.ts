import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Cursor for paging through collections */
  ConnectionCursor: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Information about the application */
export type AppInfo = {
  __typename?: 'AppInfo';
  /** A brief description of the application */
  description: Scalars['String']['output'];
  /** The name of the application */
  name: Scalars['String']['output'];
  /** The title of the application */
  title: Scalars['String']['output'];
  /** The current version of the application */
  version: Scalars['String']['output'];
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Comment model */
export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Indicates if the resource is deleted */
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Post associated with the comment */
  post: Post;
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** Array of edges. */
  edges: Array<CommentEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type CommentDeleteFilter = {
  and?: InputMaybe<Array<CommentDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<CommentDeleteFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CommentDeleteResponse = {
  __typename?: 'CommentDeleteResponse';
  content?: Maybe<Scalars['String']['output']>;
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']['output']>;
  /** Post associated with the comment */
  post?: Maybe<Post>;
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Comment */
  node: Comment;
};

export type CommentFilter = {
  and?: InputMaybe<Array<CommentFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<CommentFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type CommentSort = {
  direction: SortDirection;
  field: CommentSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum CommentSortFields {
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  DeletedAt = 'deletedAt',
  UpdatedAt = 'updatedAt'
}

/** Input for creating a comment */
export type CreateCommentInput = {
  /** The content of the comment. */
  content: Scalars['String']['input'];
  /** The ID of the post the comment belongs to. */
  post: Scalars['ID']['input'];
};

export type CreateManyCommentsInput = {
  /** Array of records to create */
  comments: Array<CreateCommentInput>;
};

export type CreateManyPostsInput = {
  /** Array of records to create */
  posts: Array<CreatePostInput>;
};

export type CreateManyRolesInput = {
  /** Array of records to create */
  roles: Array<CreateRoleInput>;
};

export type CreateManyUsersInput = {
  /** Array of records to create */
  users: Array<CreateUserInput>;
};

export type CreateOneCommentInput = {
  /** The record to create */
  comment: CreateCommentInput;
};

export type CreateOnePostInput = {
  /** The record to create */
  post: CreatePostInput;
};

export type CreateOneRoleInput = {
  /** The record to create */
  role: CreateRoleInput;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUserInput;
};

/** Input for creating a post */
export type CreatePostInput = {
  /** The content of the post. */
  content: Scalars['String']['input'];
  /** The sources of the post. */
  sources: Array<Scalars['String']['input']>;
  /** The teaser of the post. */
  teaser: Scalars['String']['input'];
  /** The title of the post. */
  title: Scalars['String']['input'];
};

/** Input for creating a role */
export type CreateRoleInput = {
  /** The description of the role. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the role. */
  name: Scalars['String']['input'];
};

/** Input for creating a user */
export type CreateUserInput = {
  /** The email address of the user. */
  email: Scalars['String']['input'];
  /** The password for the user. */
  password: Scalars['String']['input'];
  /** The unique username for the user. */
  username: Scalars['String']['input'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']['input']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type DeleteManyCommentsInput = {
  /** Filter to find records to delete */
  filter: CommentDeleteFilter;
};

export type DeleteManyPostsInput = {
  /** Filter to find records to delete */
  filter: PostDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManyRolesInput = {
  /** Filter to find records to delete */
  filter: RoleDeleteFilter;
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteOneCommentInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOnePostInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneRoleInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

/** Login response containing access token and user information */
export type Login = {
  __typename?: 'Login';
  /** JWT access token for the user */
  accessToken: Scalars['String']['output'];
  /** JWT refresh token (rotated) */
  refreshToken?: Maybe<Scalars['String']['output']>;
  /** User information */
  user: User;
};

/** Input for user login */
export type LoginInput = {
  /** The identifier of the user. */
  identifier: Scalars['String']['input'];
  /** The password of the user. */
  password: Scalars['String']['input'];
};

/** Logout response indicating success or failure */
export type Logout = {
  __typename?: 'Logout';
  /** Indicates whether the logout was successful */
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyComments: Array<Comment>;
  createManyPosts: Array<Post>;
  createManyRoles: Array<Role>;
  createManyUsers: Array<User>;
  createOneComment: Comment;
  createOnePost: Post;
  createOneRole: Role;
  createOneUser: User;
  deleteManyComments: DeleteManyResponse;
  deleteManyPosts: DeleteManyResponse;
  deleteManyRoles: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteOneComment: CommentDeleteResponse;
  deleteOnePost: PostDeleteResponse;
  deleteOneRole: RoleDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  /** Login with identifier and password */
  login: Login;
  /** Logout user and invalidate refresh token */
  logout: Logout;
  /** Rotate refresh token and get a new access token */
  refreshToken: Login;
  removeRoleFromUser: User;
  /** Seed initial data */
  seedData: Seeder;
  setRoleOnUser: User;
  updateManyPosts: UpdateManyResponse;
  updateManyRoles: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateOnePost: Post;
  updateOneRole: Role;
  updateOneUser: User;
};


export type MutationCreateManyCommentsArgs = {
  input: CreateManyCommentsInput;
};


export type MutationCreateManyPostsArgs = {
  input: CreateManyPostsInput;
};


export type MutationCreateManyRolesArgs = {
  input: CreateManyRolesInput;
};


export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};


export type MutationCreateOneCommentArgs = {
  input: CreateOneCommentInput;
};


export type MutationCreateOnePostArgs = {
  input: CreateOnePostInput;
};


export type MutationCreateOneRoleArgs = {
  input: CreateOneRoleInput;
};


export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};


export type MutationDeleteManyCommentsArgs = {
  input: DeleteManyCommentsInput;
};


export type MutationDeleteManyPostsArgs = {
  input: DeleteManyPostsInput;
};


export type MutationDeleteManyRolesArgs = {
  input: DeleteManyRolesInput;
};


export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};


export type MutationDeleteOneCommentArgs = {
  input: DeleteOneCommentInput;
};


export type MutationDeleteOnePostArgs = {
  input: DeleteOnePostInput;
};


export type MutationDeleteOneRoleArgs = {
  input: DeleteOneRoleInput;
};


export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRemoveRoleFromUserArgs = {
  input: RemoveRoleFromUserInput;
};


export type MutationSeedDataArgs = {
  seederInput: SeederInput;
};


export type MutationSetRoleOnUserArgs = {
  input: SetRoleOnUserInput;
};


export type MutationUpdateManyPostsArgs = {
  input: UpdateManyPostsInput;
};


export type MutationUpdateManyRolesArgs = {
  input: UpdateManyRolesInput;
};


export type MutationUpdateManyUsersArgs = {
  input: UpdateManyUsersInput;
};


export type MutationUpdateOnePostArgs = {
  input: UpdateOnePostInput;
};


export type MutationUpdateOneRoleArgs = {
  input: UpdateOneRoleInput;
};


export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']['output']>;
};

/** Post model */
export type Post = {
  __typename?: 'Post';
  /** Comments associated with the post */
  comments?: Maybe<PostCommentsConnection>;
  /** Content of the post */
  content: Scalars['String']['output'];
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Indicates if the resource is deleted */
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Sources of the post */
  sources?: Maybe<Array<Scalars['String']['output']>>;
  /** Teaser of the post */
  teaser: Scalars['String']['output'];
  /** Title of the post */
  title: Scalars['String']['output'];
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


/** Post model */
export type PostCommentsArgs = {
  filter?: CommentFilter;
  paging?: CursorPaging;
  sorting?: Array<CommentSort>;
};

export type PostCommentsConnection = {
  __typename?: 'PostCommentsConnection';
  /** Array of edges. */
  edges: Array<CommentEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  /** Array of edges. */
  edges: Array<PostEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PostDeleteFilter = {
  and?: InputMaybe<Array<PostDeleteFilter>>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<PostDeleteFilter>>;
  teaser?: InputMaybe<StringFieldComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type PostDeleteResponse = {
  __typename?: 'PostDeleteResponse';
  /** Comments associated with the post */
  comments?: Maybe<Array<Comment>>;
  content?: Maybe<Scalars['String']['output']>;
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']['output']>;
  /** Sources of the post */
  sources?: Maybe<Array<Scalars['String']['output']>>;
  teaser?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Post */
  node: Post;
};

export type PostFilter = {
  and?: InputMaybe<Array<PostFilter>>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<PostFilter>>;
  teaser?: InputMaybe<StringFieldComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type PostSort = {
  direction: SortDirection;
  field: PostSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum PostSortFields {
  Content = 'content',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  DeletedAt = 'deletedAt',
  Teaser = 'teaser',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export type PostUpdateFilter = {
  and?: InputMaybe<Array<PostUpdateFilter>>;
  content?: InputMaybe<StringFieldComparison>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<PostUpdateFilter>>;
  teaser?: InputMaybe<StringFieldComparison>;
  title?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type Query = {
  __typename?: 'Query';
  /** Get application information */
  appInfo: AppInfo;
  comment: Comment;
  comments: CommentConnection;
  /** Get the current user */
  me: User;
  post: Post;
  posts: PostConnection;
  role: Role;
  roles: RoleConnection;
  /** Get a list of all scheduled tasks */
  tasks: Array<TaskInfo>;
  user: User;
  users: UserConnection;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsArgs = {
  filter?: CommentFilter;
  paging?: CursorPaging;
  sorting?: Array<CommentSort>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  filter?: PostFilter;
  paging?: CursorPaging;
  sorting?: Array<PostSort>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  filter?: RoleFilter;
  paging?: CursorPaging;
  sorting?: Array<RoleSort>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: UserFilter;
  paging?: CursorPaging;
  sorting?: Array<UserSort>;
};

/** Input for refreshing tokens */
export type RefreshTokenInput = {
  /** The current refresh token */
  refreshToken: Scalars['String']['input'];
};

export type RemoveRoleFromUserInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The id of relation. */
  relationId: Scalars['ID']['input'];
};

/** Role model */
export type Role = {
  __typename?: 'Role';
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Indicates if the resource is deleted */
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Description of the role */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Indicates if the role is a system role */
  isSystemRole: Scalars['Boolean']['output'];
  /** Name of the role */
  name: Scalars['String']['output'];
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Users associated with the role */
  users?: Maybe<RoleUsersConnection>;
};


/** Role model */
export type RoleUsersArgs = {
  filter?: UserFilter;
  paging?: CursorPaging;
  sorting?: Array<UserSort>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  /** Array of edges. */
  edges: Array<RoleEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RoleDeleteFilter = {
  and?: InputMaybe<Array<RoleDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<RoleDeleteFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type RoleDeleteResponse = {
  __typename?: 'RoleDeleteResponse';
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Description of the role */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']['output']>;
  /** Indicates if the role is a system role */
  isSystemRole?: Maybe<Scalars['Boolean']['output']>;
  /** Name of the role */
  name?: Maybe<Scalars['String']['output']>;
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Users associated with this role */
  users?: Maybe<Array<User>>;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the Role */
  node: Role;
};

export type RoleFilter = {
  and?: InputMaybe<Array<RoleFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<RoleFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type RoleSort = {
  direction: SortDirection;
  field: RoleSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum RoleSortFields {
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  DeletedAt = 'deletedAt',
  UpdatedAt = 'updatedAt'
}

export type RoleUpdateFilter = {
  and?: InputMaybe<Array<RoleUpdateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<RoleUpdateFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type RoleUsersConnection = {
  __typename?: 'RoleUsersConnection';
  /** Array of edges. */
  edges: Array<UserEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

/** Seeder model for managing seeding operations */
export type Seeder = {
  __typename?: 'Seeder';
  /** Comment information for the seeding operation */
  comment?: Maybe<SeederComment>;
  /** Timestamp of when the seeding operation was completed */
  completedAt: Scalars['DateTime']['output'];
  /** Environment in which the seeding operation was performed */
  nodeEnv?: Maybe<Scalars['String']['output']>;
  /** Post information for the seeding operation */
  post?: Maybe<SeederPost>;
  /** Role information for the seeding operation */
  role?: Maybe<SeederRole>;
  /** Timestamp of when the seeding operation was started */
  startedAt: Scalars['DateTime']['output'];
  /** User information for the seeding operation */
  user?: Maybe<SeederUser>;
};

/** Seeder model for comments */
export type SeederComment = {
  __typename?: 'SeederComment';
  /** List of comments */
  comments?: Maybe<Array<Comment>>;
  /** Timestamp of when the seeding operation was completed */
  completedAt: Scalars['DateTime']['output'];
  /** Optional error message if the seeding operation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** Timestamp of when the seeding operation was started */
  startedAt: Scalars['DateTime']['output'];
  /** Indicates if the seeding operation was successful */
  success: Scalars['Boolean']['output'];
};

/** Input for seeding data */
export type SeederInput = {
  /** Flag to seed comments */
  seedComments?: InputMaybe<Scalars['Boolean']['input']>;
  /** Flag to seed posts */
  seedPosts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Flag to seed roles */
  seedRoles?: InputMaybe<Scalars['Boolean']['input']>;
  /** Flag to seed users */
  seedUsers?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Seeder model for posts */
export type SeederPost = {
  __typename?: 'SeederPost';
  /** Timestamp of when the seeding operation was completed */
  completedAt: Scalars['DateTime']['output'];
  /** Optional error message if the seeding operation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** List of posts */
  posts?: Maybe<Array<Post>>;
  /** Timestamp of when the seeding operation was started */
  startedAt: Scalars['DateTime']['output'];
  /** Indicates if the seeding operation was successful */
  success: Scalars['Boolean']['output'];
};

/** Seeder model for roles */
export type SeederRole = {
  __typename?: 'SeederRole';
  /** Timestamp of when the seeding operation was completed */
  completedAt: Scalars['DateTime']['output'];
  /** Optional error message if the seeding operation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** List of roles */
  roles?: Maybe<Array<Role>>;
  /** Timestamp of when the seeding operation was started */
  startedAt: Scalars['DateTime']['output'];
  /** Indicates if the seeding operation was successful */
  success: Scalars['Boolean']['output'];
};

/** Seeder model for users */
export type SeederUser = {
  __typename?: 'SeederUser';
  /** Timestamp of when the seeding operation was completed */
  completedAt: Scalars['DateTime']['output'];
  /** Optional error message if the seeding operation failed */
  error?: Maybe<Scalars['String']['output']>;
  /** Timestamp of when the seeding operation was started */
  startedAt: Scalars['DateTime']['output'];
  /** Indicates if the seeding operation was successful */
  success: Scalars['Boolean']['output'];
  /** List of users */
  users?: Maybe<Array<User>>;
};

export type SetRoleOnUserInput = {
  /** The id of the record. */
  id: Scalars['ID']['input'];
  /** The id of relation. */
  relationId: Scalars['ID']['input'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type TaskInfo = {
  __typename?: 'TaskInfo';
  /** The last execution time of the task */
  lastDate?: Maybe<Scalars['DateTime']['output']>;
  /** The result of the last execution */
  lastResult?: Maybe<TaskResult>;
  /** The name of the task */
  name: Scalars['String']['output'];
  /** The next scheduled execution time of the task */
  nextDate: Scalars['DateTime']['output'];
  /** The current state of the task */
  state: TaskState;
};

export enum TaskResult {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

export enum TaskState {
  Idle = 'IDLE',
  Running = 'RUNNING',
  Unknown = 'UNKNOWN'
}

export type UpdateManyPostsInput = {
  /** Filter used to find fields to update */
  filter: PostUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdatePostInput;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyRolesInput = {
  /** Filter used to find fields to update */
  filter: RoleUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateRoleInput;
};

export type UpdateManyUsersInput = {
  /** Filter used to find fields to update */
  filter: UserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUserInput;
};

export type UpdateOnePostInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePostInput;
};

export type UpdateOneRoleInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateRoleInput;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateUserInput;
};

/** Input for updating an existing post */
export type UpdatePostInput = {
  /** The content of the post. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The sources of the post. */
  sources?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The teaser of the post. */
  teaser?: InputMaybe<Scalars['String']['input']>;
  /** The title of the post. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating a role */
export type UpdateRoleInput = {
  /** The description of the role. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the role. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input for updating a user */
export type UpdateUserInput = {
  /** The email address of the user. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The unique username for the user. */
  username?: InputMaybe<Scalars['String']['input']>;
};

/** User model */
export type User = {
  __typename?: 'User';
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Indicates if the resource is deleted */
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Email address of the user */
  email: Scalars['String']['output'];
  /** Unique identifier for the resource */
  id: Scalars['ID']['output'];
  /** Timestamp of the user's last login */
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  /** Role of the user */
  role?: Maybe<Role>;
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Username of the user */
  username: Scalars['String']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** Array of edges. */
  edges: Array<UserEdge>;
  /** Paging information */
  pageInfo: PageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type UserDeleteFilter = {
  and?: InputMaybe<Array<UserDeleteFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserDeleteFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  username?: InputMaybe<StringFieldComparison>;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  /** Timestamp of resource creation */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  /** Timestamp of when the resource was deleted */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the resource */
  id?: Maybe<Scalars['ID']['output']>;
  /** Timestamp of the user's last login */
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  /** Role of the user */
  role?: Maybe<Role>;
  /** Timestamp of last update to the resource */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor']['output'];
  /** The node containing the User */
  node: User;
};

export type UserFilter = {
  and?: InputMaybe<Array<UserFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  username?: InputMaybe<StringFieldComparison>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum UserSortFields {
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  DeletedAt = 'deletedAt',
  Email = 'email',
  UpdatedAt = 'updatedAt',
  Username = 'username'
}

export type UserUpdateFilter = {
  and?: InputMaybe<Array<UserUpdateFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  deleted?: InputMaybe<BooleanFieldComparison>;
  deletedAt?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserUpdateFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
  username?: InputMaybe<StringFieldComparison>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', accessToken: string, refreshToken?: string | null, user: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, deleted?: boolean | null, username: string, email: string, lastLogin?: any | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Logout', success: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, deleted?: boolean | null, username: string, email: string, lastLogin?: any | null } };

export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    refreshToken
    user {
      id
      createdAt
      updatedAt
      deletedAt
      deleted
      username
      email
      lastLogin
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Mutation<LogoutMutation, LogoutMutationVariables> {
    override document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MeDocument = gql`
    query Me {
  me {
    id
    createdAt
    updatedAt
    deletedAt
    deleted
    username
    email
    lastLogin
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    override document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
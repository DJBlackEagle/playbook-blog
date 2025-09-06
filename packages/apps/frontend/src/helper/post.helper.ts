import { Post } from '../app/generated/graphql';

export function hasPostBeenUpdated(post: Partial<Post>): boolean {
  return !!post.updatedAt && post.updatedAt !== post.createdAt;
}

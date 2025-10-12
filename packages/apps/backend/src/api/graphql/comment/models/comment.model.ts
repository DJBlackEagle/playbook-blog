import { Field, ObjectType } from '@nestjs/graphql';
import { QueryOptions, Relation } from '@ptc-org/nestjs-query-graphql';
import { BaseModel } from '../../../../shared';
import { Post } from '../../post/models/post.model';

/**
 * GraphQL model representing a comment on a post.
 *
 * Includes the comment content and the associated post.
 *
 * @example
 * {
 *   content: "Great post!",
 *   post: { ... }
 * }
 */
@ObjectType('Comment', { description: 'Comment model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
@Relation('post', () => Post, {
  description: 'Post associated with the comment',
})
export class Comment extends BaseModel {
  /**
   * The content of the comment.
   * @example "Great post!"
   */
  @Field()
  content: string;

  /**
   * The post associated with the comment.
   * @example { title: 'Understanding GraphQL in NestJS', ... }
   */
  @Field(() => Post, {
    nullable: false,
    description: 'Post associated with the comment',
  })
  post: Post;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/models/post.model';
import { SeederBase } from '../base/seeder-base.model';

/**
 * GraphQL object type representing the result of a post seeding operation.
 *
 * Extends {@link SeederBase} and contains a list of seeded posts.
 *
 * @example
 * {
 *   posts: [
 *     { title: 'Welcome', content: 'Hello world!' },
 *     { title: 'Second Post', content: 'More content...' }
 *   ]
 * }
 */
@ObjectType({ description: 'Seeder model for posts' })
export class SeederPost extends SeederBase {
  /**
   * List of posts that were seeded.
   * Optional.
   * @example [{ title: 'Welcome', content: 'Hello world!' }]
   */
  @Field(() => [Post], { description: 'List of posts', nullable: true })
  posts?: Post[];
}

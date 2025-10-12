import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../../comment/models/comment.model';
import { SeederBase } from '../base/seeder-base.model';

/**
 * GraphQL model representing the result of seeding comments.
 *
 * Extends SeederBase and contains a list of seeded comments.
 */
@ObjectType({ description: 'Seeder model for comments' })
export class SeederComment extends SeederBase {
  /**
   * List of seeded comments.
   */
  @Field(() => [Comment], { description: 'List of comments', nullable: true })
  comments?: Comment[];
}

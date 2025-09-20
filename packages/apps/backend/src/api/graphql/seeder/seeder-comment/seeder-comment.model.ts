import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../../comment/models/comment.model';
import { SeederBase } from '../base/seeder-base.model';

@ObjectType({ description: 'Seeder model for comments' })
export class SeederComment extends SeederBase {
  @Field(() => [Comment], { description: 'List of comments', nullable: true })
  comments?: Comment[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { BaseModel } from '../../../base';
import { Comment } from '../../comment/models/comment.model';

@ObjectType('Post', { description: 'Post model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
@CursorConnection('comments', () => Comment, {
  description: 'Comments associated with the post',
  nullable: true,
})
export class Post extends BaseModel {
  @Field({ description: 'Title of the post' })
  @FilterableField()
  title: string;

  @Field({ description: 'Teaser of the post' })
  @FilterableField()
  teaser: string;

  @Field({ description: 'Content of the post' })
  @FilterableField()
  content: string;

  @Field(() => [Comment], {
    nullable: true,
    description: 'Comments associated with the post',
  })
  comments?: Comment[];
}

import { Field, ObjectType } from '@nestjs/graphql';
import { QueryOptions, Relation } from '@ptc-org/nestjs-query-graphql';
import { BaseModel } from '../../../base';
import { Post } from '../../post/models/post.model';

@ObjectType('Comment', { description: 'Comment model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
@Relation('post', () => Post, {
  description: 'Post associated with the comment',
})
export class Comment extends BaseModel {
  @Field()
  content: string;

  @Field(() => Post, {
    nullable: false,
    description: 'Post associated with the comment',
  })
  post: Post;
}

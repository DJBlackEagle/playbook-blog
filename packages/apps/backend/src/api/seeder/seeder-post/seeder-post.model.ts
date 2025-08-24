import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/models/post.model';
import { SeederBase } from '../base/seeder-base.model';

@ObjectType({ description: 'Seeder model for posts' })
export class SeederPost extends SeederBase {
  @Field(() => [Post], { description: 'List of posts', nullable: true })
  posts?: Post[];
}

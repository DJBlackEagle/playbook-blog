import { Field, ObjectType } from '@nestjs/graphql';
import { SeederComment } from './seeder-comment/seeder-comment.model';
import { SeederPost } from './seeder-post/seeder-post.model';
import { SeederRole } from './seeder-role/seeder-role.model';
import { SeederUser } from './seeder-user/seeder-role.model';

@ObjectType({ description: 'Seeder model for managing seeding operations' })
export class Seeder {
  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was started',
  })
  startedAt: Date;

  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was completed',
  })
  completedAt: Date;

  @Field(() => SeederRole, {
    description: 'Role information for the seeding operation',
    nullable: true,
  })
  role?: SeederRole;

  @Field(() => SeederUser, {
    description: 'User information for the seeding operation',
    nullable: true,
  })
  user?: SeederUser;

  @Field(() => SeederPost, {
    description: 'Post information for the seeding operation',
    nullable: true,
  })
  post?: SeederPost;

  @Field(() => SeederComment, {
    description: 'Comment information for the seeding operation',
    nullable: true,
  })
  comment?: SeederComment;

  @Field(() => String, {
    description: 'Environment in which the seeding operation was performed',
    nullable: true,
  })
  nodeEnv?: string;
}

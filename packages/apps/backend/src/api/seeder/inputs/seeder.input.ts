import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for seeding data' })
export class SeederInput {
  @Field(() => Boolean, {
    description: 'Flag to seed roles',
    nullable: true,
    defaultValue: false,
  })
  seedRoles?: boolean;

  @Field(() => Boolean, {
    description: 'Flag to seed users',
    nullable: true,
    defaultValue: false,
  })
  seedUsers?: boolean;

  @Field(() => Boolean, {
    description: 'Flag to seed posts',
    nullable: true,
    defaultValue: false,
  })
  seedPosts?: boolean;

  @Field(() => Boolean, {
    description: 'Flag to seed comments',
    nullable: true,
    defaultValue: false,
  })
  seedComments?: boolean;
}

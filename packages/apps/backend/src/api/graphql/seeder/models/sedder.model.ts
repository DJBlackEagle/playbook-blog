import { Field, ObjectType } from '@nestjs/graphql';
import { SeederPost } from '../seeder-post/seeder-post.model';
import { SeederRole } from '../seeder-role/seeder-role.model';
import { SeederUser } from '../seeder-user/seeder-user.model';

/**
 * GraphQL object type representing the result and metadata of a seeding operation.
 *
 * Contains timestamps, environment, and details about seeded roles, users, and posts.
 * Extend this model to include additional seeding result information as needed.
 *
 * @example
 * {
 *   startedAt: new Date('2025-09-17T10:00:00Z'),
 *   completedAt: new Date('2025-09-17T10:00:10Z'),
 *   nodeEnv: 'development',
 *   role: { ... },
 *   user: { ... },
 *   post: { ... }
 * }
 */
@ObjectType({ description: 'Seeder model for managing seeding operations' })
export class Seeder {
  /**
   * Timestamp of when the seeding operation was started.
   * @example new Date('2025-09-17T10:00:00Z')
   */
  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was started',
  })
  startedAt: Date;

  /**
   * Timestamp of when the seeding operation was completed.
   * @example new Date('2025-09-17T10:00:10Z')
   */
  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was completed',
  })
  completedAt: Date;

  /**
   * Environment in which the seeding operation was performed (e.g., 'development', 'production').
   * Optional.
   * @example 'development'
   */
  @Field(() => String, {
    description: 'Environment in which the seeding operation was performed',
    nullable: true,
  })
  nodeEnv?: string;

  /**
   * Role information associated with the seeding operation.
   * Contains details about the role that was seeded. Optional.
   * @example { name: 'admin', permissions: [...] }
   */
  @Field(() => SeederRole, {
    description: 'Role information for the seeding operation',
    nullable: true,
  })
  role?: SeederRole;

  /**
   * User information associated with the seeding operation.
   * Contains details about the user that was seeded. Optional.
   * @example { username: 'john', email: 'john@example.com' }
   */
  @Field(() => SeederUser, {
    description: 'User information for the seeding operation',
    nullable: true,
  })
  user?: SeederUser;

  /**
   * Post information associated with the seeding operation.
   * Contains details about the post that was seeded. Optional.
   * @example { title: 'Welcome', content: 'Hello world!' }
   */
  @Field(() => SeederPost, {
    description: 'Post information for the seeding operation',
    nullable: true,
  })
  post?: SeederPost;
}

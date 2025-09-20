import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL object type representing the result and metadata of a seeding operation.
 *
 * Extend this model to include additional seeding result information as needed.
 *
 * @example
 * {
 *   startedAt: new Date('2025-09-17T10:00:00Z'),
 *   completedAt: new Date('2025-09-17T10:00:10Z'),
 *   nodeEnv: 'development',
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
}

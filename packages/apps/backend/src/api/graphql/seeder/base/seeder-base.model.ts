import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Base model for seeder operations.
 *
 * Provides common fields for tracking the status and timing of seeding processes.
 *
 * @example
 * const seeder = new SeederBase();
 * seeder.startedAt = new Date();
 * seeder.completedAt = new Date();
 * seeder.success = true;
 * seeder.error = undefined;
 */
@ObjectType({ description: 'Base model for seeder operations' })
export class SeederBase {
  /**
   * Timestamp of when the seeding operation was started.
   */
  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was started',
  })
  startedAt: Date;

  /**
   * Timestamp of when the seeding operation was completed.
   */
  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was completed',
  })
  completedAt: Date;

  /**
   * Indicates if the seeding operation was successful.
   */
  @Field(() => Boolean, {
    description: 'Indicates if the seeding operation was successful',
    defaultValue: false,
  })
  success: boolean;

  /**
   * Optional error message if the seeding operation failed.
   */
  @Field(() => String, {
    description: 'Optional error message if the seeding operation failed',
    nullable: true,
  })
  error?: string;
}

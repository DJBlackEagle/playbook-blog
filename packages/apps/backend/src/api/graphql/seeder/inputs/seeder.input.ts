import { Field, InputType } from '@nestjs/graphql';

/**
 * GraphQL input type for seeding data in the application database.
 *
 * Provides boolean flags to control which data sets (roles, users) should be seeded.
 * Extend this input to add more seeding options as needed for future features.
 *
 * @example
 * {
 *   seedRoles: true,
 *   seedUsers: false
 * }
 */
@InputType({ description: 'Input for seeding data' })
export class SeederInput {
  /**
   * If true, roles will be seeded into the database.
   * Defaults to false if not provided.
   * @example true
   */
  @Field(() => Boolean, {
    description: 'Flag to seed roles',
    nullable: true,
    defaultValue: false,
  })
  seedRoles?: boolean;

  /**
   * If true, user data will be seeded into the database.
   * Defaults to false if not provided.
   * @example false
   */
  @Field(() => Boolean, {
    description: 'Flag to seed users',
    nullable: true,
    defaultValue: false,
  })
  seedUsers?: boolean;
}

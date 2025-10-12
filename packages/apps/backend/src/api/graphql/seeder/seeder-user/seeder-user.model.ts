import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { SeederBase } from '../base/seeder-base.model';

/**
 * GraphQL object type representing a seeder for users.
 *
 * Extends SeederBase to provide user-specific seeding functionality.
 */
@ObjectType({ description: 'Seeder model for users' })
export class SeederUser extends SeederBase {
  /**
   * List of users to be seeded.
   *
   * Contains user entities that are part of the seeding operation. Optional.
   */
  @Field(() => [User], { description: 'List of users', nullable: true })
  users?: User[];
}

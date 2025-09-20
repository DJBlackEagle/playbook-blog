import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../roles/models/role.model';
import { SeederBase } from '../base/seeder-base.model';

/**
 * Seeder model for roles.
 *
 * Extends SeederBase and provides a list of roles to be seeded.
 */
@ObjectType({ description: 'Seeder model for roles' })
export class SeederRole extends SeederBase {
  /**
   * List of roles to be seeded (optional).
   */
  @Field(() => [Role], { description: 'List of roles', nullable: true })
  roles?: Role[];
}

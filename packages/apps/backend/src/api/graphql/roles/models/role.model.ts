import { Field, ObjectType } from '@nestjs/graphql';
import { QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseModel } from '../../../../shared';

/**
 * Role GraphQL model.
 *
 * Represents a user role within the system, including its name, description, and system status.
 *
 * @extends BaseModel
 */
@ObjectType('Role', { description: 'Role model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
export class Role extends BaseModel {
  /**
   * Name of the role.
   */
  @Field({ description: 'Name of the role' })
  name: string;

  /**
   * Optional description of the role.
   */
  @Field({ nullable: true, description: 'Description of the role' })
  description?: string;

  /**
   * Indicates if the role is a system role.
   */
  @Field({ description: 'Indicates if the role is a system role' })
  isSystemRole: boolean;
}

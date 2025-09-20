import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Expose } from 'class-transformer';
import { BaseModel } from '../../../../shared';
import { Role } from '../../roles/models/role.model';

/**
 * GraphQL model representing a user.
 *
 * Contains user identity, contact, last login, and role information.
 */
@ObjectType('User', { description: 'User model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
@Relation('role', () => Role, {
  description: 'Role of the user',
  nullable: true,
  update: { enabled: true },
  remove: { enabled: true },
})
export class User extends BaseModel {
  /**
   * Username of the user.
   */
  @Field({ description: 'Username of the user' })
  @FilterableField()
  @Expose()
  username: string;

  /**
   * Email address of the user.
   */
  @Field({ description: 'Email address of the user' })
  @FilterableField()
  @Expose()
  email: string;

  /**
   * Timestamp of the user's last login.
   */
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: "Timestamp of the user's last login",
  })
  @Expose()
  lastLogin?: Date;

  /**
   * Role of the user.
   */
  @Field(() => Role, { nullable: true, description: 'Role of the user' })
  @Expose()
  role?: Role;
}

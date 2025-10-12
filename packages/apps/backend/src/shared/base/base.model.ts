/* istanbul ignore file */
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

/**
 * Base GraphQL ObjectType with common fields for all resources.
 *
 * Extend this abstract class for your feature models to inherit
 * standard fields and soft-delete support.
 *
 * @example
 * @ObjectType()
 * export class UserModel extends BaseModel {
 *   @Field() name: string;
 * }
 */
@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  /**
   * Unique identifier for the resource.
   */
  @Field(() => ID, { description: 'Unique identifier for the resource' })
  id: string;

  /**
   * Timestamp of resource creation.
   * Set automatically by the database.
   */
  @Field(() => Date, {
    nullable: true,
    description: 'Timestamp of resource creation',
  })
  @FilterableField({ description: 'Timestamp of resource creation' })
  createdAt: Date;

  /**
   * Timestamp of last update to the resource.
   * Set automatically by the database.
   */
  @Field(() => Date, {
    nullable: true,
    description: 'Timestamp of last update to the resource',
  })
  @FilterableField({ description: 'Timestamp of last update to the resource' })
  updatedAt: Date;

  /**
   * Timestamp of when the resource was deleted (soft-delete).
   * Nullable: only set if deleted.
   */
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Timestamp of when the resource was deleted',
  })
  @FilterableField({
    nullable: true,
    description: 'Timestamp of when the resource was deleted',
  })
  deletedAt?: Date;

  /**
   * Indicates if the resource is deleted (soft-delete).
   * @default false
   */
  @Field(() => Boolean, {
    description: 'Indicates if the resource is deleted',
  })
  @FilterableField({ nullable: true })
  deleted: boolean;
}

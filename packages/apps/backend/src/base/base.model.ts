import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';

@ObjectType('BaseModel', { description: 'Base model with common fields' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
export class BaseModel {
  @Field(() => ID, { description: 'Unique identifier for the resource' })
  id: string;

  @Field(() => Date, {
    nullable: true,
    description: 'Timestamp of resource creation',
  })
  createdAt: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Timestamp of last update to the resource',
  })
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Timestamp of when the resource was deleted',
  })
  @FilterableField({
    nullable: true,
    description: 'Timestamp of when the resource was deleted',
  })
  deletedAt?: Date;

  @Field(() => Boolean, {
    description: 'Indicates if the resource is deleted',
  })
  @FilterableField({ nullable: true })
  deleted: boolean;
}

import { Field, InputType } from '@nestjs/graphql';

/**
 * GraphQL input type for seeding data in the application database.
 *
 * Extend this input to add more seeding options as needed for future features.
 *
 * @example
 * {
 *   dummy: 'sdfdsfs'
 * }
 */
@InputType({ description: 'Input for seeding data' })
export class SeederInput {
  @Field(() => String, {
    nullable: true,
  })
  dummy?: string;
}

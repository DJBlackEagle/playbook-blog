import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL model representing the logout response.
 *
 * Indicates whether the logout operation was successful.
 */
@ObjectType({
  description: 'Logout response indicating success or failure',
})
export class Logout {
  /**
   * Indicates whether the logout was successful.
   */
  @Field(() => Boolean, {
    description: 'Indicates whether the logout was successful',
  })
  success: boolean;
}

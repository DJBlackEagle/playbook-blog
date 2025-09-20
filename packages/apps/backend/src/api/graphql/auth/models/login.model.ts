import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

/**
 * GraphQL model representing the login response.
 *
 * Contains the access token, optional refresh token, and user information.
 */
@ObjectType({
  description: 'Login response containing access token and user information',
})
export class Login {
  /**
   * JWT access token for the user.
   */
  @Field({ description: 'JWT access token for the user' })
  accessToken!: string;

  /**
   * JWT refresh token (rotated), if applicable.
   */
  @Field({ nullable: true, description: 'JWT refresh token (rotated)' })
  refreshToken?: string;

  /**
   * User information associated with the login.
   */
  @Field(() => User, { description: 'User information' })
  user!: User;
}

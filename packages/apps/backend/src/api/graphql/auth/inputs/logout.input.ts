import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

/**
 * GraphQL input type for user logout operation.
 *
 * Contains the current refresh token string required for logout.
 */
@InputType({ description: 'Input for user logout' })
export class LogoutInput {
  /**
   * The current refresh token string.
   */
  @Field({ description: 'The current refresh token' })
  @IsString()
  @MinLength(10)
  refreshToken!: string;
}

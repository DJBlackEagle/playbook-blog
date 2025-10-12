import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

/**
 * GraphQL input type for refreshing authentication tokens.
 *
 * Contains the current refresh token string.
 */
@InputType({ description: 'Input for refreshing tokens' })
export class RefreshTokenInput {
  /**
   * The current refresh token string.
   */
  @Field({ description: 'The current refresh token' })
  @IsString()
  @MinLength(10)
  refreshToken!: string;
}

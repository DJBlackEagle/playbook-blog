import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IsPassword } from '../../../../common/validators';

/**
 * GraphQL input type for user login operation.
 *
 * Contains the user identifier and password fields.
 */
@InputType({ description: 'Input for user login' })
export class LoginInput {
  /**
   * The identifier of the user (username or email).
   */
  @Field({ description: 'The identifier of the user.' })
  @IsString()
  identifier!: string;

  /**
   * The password of the user.
   */
  @Field({ description: 'The password of the user.' })
  @IsPassword({
    min: 1,
    max: 0,
    requireLowercase: false,
    requireNumber: false,
    requireSpecial: false,
    requireUppercase: false,
  })
  password!: string;
}

import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { IsPassword, IsUsername } from '../../../../common/validators';
import { BaseInput } from '../../../../shared';

/**
 * GraphQL input type for creating a new user.
 *
 * Contains username, email, and password fields.
 */
@InputType({ description: 'Input for creating a user' })
export class CreateUserInput extends PartialType(BaseInput) {
  /**
   * The unique username for the user.
   */
  @Field({ description: 'The unique username for the user.', nullable: false })
  @IsUsername()
  username: string;

  /**
   * The email address of the user.
   */
  @Field({ description: 'The email address of the user.', nullable: false })
  @IsString()
  @IsEmail()
  email: string;

  /**
   * The password for the user.
   */
  @Field({ description: 'The password for the user.' })
  @IsPassword()
  password!: string;
}

import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { BaseCreateInput } from '../../../base/base-create.input';
import { IsPassword, IsUsername } from '../../../decorators/validators';

@InputType({ description: 'Input for creating a user' })
export class CreateUserInput extends PartialType(BaseCreateInput) {
  @Field({ description: 'The unique username for the user.', nullable: false })
  @IsUsername()
  username: string;

  @Field({ description: 'The email address of the user.', nullable: false })
  @IsString()
  @IsEmail()
  email: string;

  @Field({ description: 'The password for the user.' })
  @IsPassword()
  password!: string;
}

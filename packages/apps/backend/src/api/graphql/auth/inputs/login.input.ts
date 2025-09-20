import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { IsPassword } from '../../../../common/validators';

@InputType({ description: 'Input for user login' })
export class LoginInput {
  @Field({ description: 'The identifier of the user.' })
  @IsString()
  identifier!: string;

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

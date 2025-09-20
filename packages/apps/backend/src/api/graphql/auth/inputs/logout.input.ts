import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType({ description: 'Input for user logout' })
export class LogoutInput {
  @Field({ description: 'The current refresh token' })
  @IsString()
  @MinLength(10)
  refreshToken!: string;
}

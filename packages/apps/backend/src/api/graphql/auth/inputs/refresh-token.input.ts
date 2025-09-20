import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType({ description: 'Input for refreshing tokens' })
export class RefreshTokenInput {
  @Field({ description: 'The current refresh token' })
  @IsString()
  @MinLength(10)
  refreshToken!: string;
}

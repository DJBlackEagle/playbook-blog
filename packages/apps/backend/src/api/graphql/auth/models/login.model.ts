import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType({
  description: 'Login response containing access token and user information',
})
export class Login {
  @Field({ description: 'JWT access token for the user' })
  accessToken!: string;

  @Field({ nullable: true, description: 'JWT refresh token (rotated)' })
  refreshToken?: string;

  @Field(() => User, { description: 'User information' })
  user!: User;
}

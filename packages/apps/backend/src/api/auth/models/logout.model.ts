import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Logout response indicating success or failure',
})
export class Logout {
  @Field(() => Boolean, {
    description: 'Indicates whether the logout was successful',
  })
  success: boolean;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Represents the result of a password verification attempt',
})
export class TestingEncryptionVerifyPassword {
  @Field({ description: 'The raw password to verify' })
  rawPassword: string;

  @Field({
    description: 'The hashed password to compare against',
    nullable: true,
  })
  hashedPassword?: string;

  @Field({
    description: 'Indicates if the password verification was successful',
  })
  isVerified: boolean;
}

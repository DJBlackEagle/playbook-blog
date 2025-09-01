import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Represents a hashed password' })
export class TestingEncryptionHashPassword {
  @Field({ description: 'The raw password before hashing' })
  rawPassword: string;

  @Field({ description: 'The hashed password', nullable: true })
  hashedPassword?: string;
}

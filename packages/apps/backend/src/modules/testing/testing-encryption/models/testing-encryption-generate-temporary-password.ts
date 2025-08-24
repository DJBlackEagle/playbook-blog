import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description:
    'Represents the result of a temporary password generation attempt',
})
export class TestingEncryptionGenerateTemporaryPassword {
  @Field({ description: 'The generated temporary password' })
  temporaryPassword: string;
}

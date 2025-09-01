import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Represents the result of a unique token generation attempt',
})
export class TestingEncryptionGenerateUniqueToken {
  @Field({ description: 'The generated unique token' })
  uniqueToken: string;
}

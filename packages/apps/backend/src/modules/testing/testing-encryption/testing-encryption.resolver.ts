import { Args, Query, Resolver } from '@nestjs/graphql';
import { TestingEncryptionGenerateTemporaryPassword } from './models/testing-encryption-generate-temporary-password';
import { TestingEncryptionGenerateUniqueToken } from './models/testing-encryption-generate-unique-token.model';
import { TestingEncryptionHashPassword } from './models/testing-encryption-hash-password.model';
import { TestingEncryptionVerifyPassword } from './models/testing-encryption-verify-password.model';
import { TestingEncryptionService } from './testing-encryption.service';

@Resolver()
export class TestingEncryptionResolver {
  constructor(
    private readonly testingEncryptionService: TestingEncryptionService,
  ) {}

  @Query(() => TestingEncryptionHashPassword, {
    name: 'testEncryptHashPassword',
    description: 'Hashes a password',
  })
  async hashPassword(
    @Args('rawPassword') rawPassword: string,
  ): Promise<TestingEncryptionHashPassword> {
    return this.testingEncryptionService.hashPassword(rawPassword);
  }

  @Query(() => TestingEncryptionVerifyPassword, {
    name: 'testEncryptVerifyPassword',
    description: 'Verifies a password',
  })
  async verifyPassword(
    @Args('rawPassword') rawPassword: string,
    @Args('hashedPassword') hashedPassword: string,
  ): Promise<TestingEncryptionVerifyPassword> {
    return this.testingEncryptionService.verifyPassword(
      rawPassword,
      hashedPassword,
    );
  }

  @Query(() => TestingEncryptionGenerateTemporaryPassword, {
    name: 'testEncryptGenerateTemporaryPassword',
    description: 'Generates a temporary password',
  })
  generateTemporaryPassword(
    @Args('length', { nullable: true, defaultValue: 10 }) length: number,
  ): TestingEncryptionGenerateTemporaryPassword {
    return this.testingEncryptionService.generateTemporaryPassword(length);
  }

  @Query(() => TestingEncryptionGenerateUniqueToken, {
    name: 'testEncryptGenerateUniqueToken',
    description: 'Generates a unique token',
  })
  generateUniqueToken(
    @Args('length', { nullable: true, defaultValue: 3 }) length: number,
  ): TestingEncryptionGenerateUniqueToken {
    return this.testingEncryptionService.generateUniqueToken(length);
  }
}

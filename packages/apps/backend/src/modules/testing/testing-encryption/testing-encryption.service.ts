import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../../encryption/encryption.service';
import { TestingEncryptionGenerateTemporaryPassword } from './models/testing-encryption-generate-temporary-password';
import { TestingEncryptionGenerateUniqueToken } from './models/testing-encryption-generate-unique-token.model';
import { TestingEncryptionHashPassword } from './models/testing-encryption-hash-password.model';
import { TestingEncryptionVerifyPassword } from './models/testing-encryption-verify-password.model';

@Injectable()
export class TestingEncryptionService {
  constructor(private readonly encryptionService: EncryptionService) {}

  async hashPassword(
    rawPassword: string,
  ): Promise<TestingEncryptionHashPassword> {
    const hashedPassword = await this.encryptionService.hash(rawPassword);

    return {
      rawPassword: rawPassword,
      hashedPassword: hashedPassword,
    };
  }

  async verifyPassword(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<TestingEncryptionVerifyPassword> {
    const isValid = await this.encryptionService.verify(
      rawPassword,
      hashedPassword,
    );

    return {
      rawPassword: rawPassword,
      hashedPassword: hashedPassword,
      isVerified: isValid,
    };
  }

  generateTemporaryPassword(
    length: number = 10,
  ): TestingEncryptionGenerateTemporaryPassword {
    const temporaryPassword =
      this.encryptionService.generateTemporaryPassword(length);

    return {
      temporaryPassword: temporaryPassword,
    };
  }

  generateUniqueToken(
    length: number = 3,
  ): TestingEncryptionGenerateUniqueToken {
    const uniqueToken = this.encryptionService.generateUniqueToken(length);

    return {
      uniqueToken: uniqueToken,
    };
  }
}

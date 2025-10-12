import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { randomBytes, randomInt } from 'crypto';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';

/**
 * Service providing cryptographic utilities such as password hashing, verification,
 * secure temporary password generation, and unique token creation.
 *
 * @remarks
 * - Utilizes the Argon2id algorithm for secure password hashing and verification.
 * - Supports configurable hashing parameters and password peppering for enhanced security.
 * - Offers methods to generate strong temporary passwords and URL-safe unique tokens.
 *
 * @example
 * ```typescript
 * const hash = await encryptionService.hash('myPassword');
 * const isValid = await encryptionService.verify('myPassword', hash);
 * const tempPassword = encryptionService.generateTemporaryPassword(16);
 * const token = encryptionService.generateUniqueToken();
 * ```
 */
@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly argonTime: number;
  private readonly argonMemory: number;
  private readonly argonParallelism: number;
  private readonly pepper: string;

  /**
   * Initializes the EncryptionService with configuration values for Argon2 hashing parameters and password pepper.
   *
   * @param environmentConfigService - The configuration service used to retrieve environment variables.
   *
   * @remarks
   * - `argonTime`: Number of iterations for Argon2 (default: 3).
   * - `argonMemory`: Amount of memory (in KiB) for Argon2 (default: 65536).
   * - `argonParallelism`: Degree of parallelism for Argon2 (default: 1).
   * - `pepper`: Additional secret value appended to passwords before hashing (default: empty string).
   */
  constructor(private environmentConfigService: EnvironmentConfigService) {
    this.argonTime = this.environmentConfigService.encryption.argon2.time();
    this.argonMemory = this.environmentConfigService.encryption.argon2.memory();
    this.argonParallelism =
      this.environmentConfigService.encryption.argon2.parallelism();
    this.pepper = this.environmentConfigService.encryption.pepper();
  }

  /**
   * Generates a secure hash of the provided raw value using the Argon2id algorithm.
   * Optionally appends a pepper to the input before hashing for added security.
   *
   * @param rawValue - The plain text string to be hashed.
   * @returns A promise that resolves to the hashed string.
   * @throws BadRequestException If the input value is missing or empty.
   * @throws InternalServerErrorException If hashing fails due to an internal error.
   */
  async hash(rawValue: string): Promise<string> {
    if (!rawValue || rawValue.length < 1) {
      throw new BadRequestException('Value is required');
    }
    try {
      const input = this.pepper ? `${rawValue}${this.pepper}` : rawValue;
      return await argon2.hash(input, {
        type: argon2.argon2id,
        timeCost: this.argonTime,
        memoryCost: this.argonMemory,
        parallelism: this.argonParallelism,
      });
    } catch (e) {
      this.logger.error(
        'Failed to hash password',
        e instanceof Error ? e.stack : String(e),
      );
      throw new InternalServerErrorException('Hashing failed');
    }
  }

  /**
   * Verifies whether a raw value matches a given hashed value using Argon2.
   *
   * @param rawValue - The plain text value to verify.
   * @param hashedValue - The hashed value to compare against.
   * @returns A promise that resolves to `true` if the raw value matches the hash, otherwise `false`.
   * @throws {BadRequestException} If either `rawValue` or `hashedValue` is missing.
   * @throws {InternalServerErrorException} If verification fails due to an internal error.
   */
  async verify(
    rawValue: string = '',
    hashedValue: string = '',
  ): Promise<boolean> {
    if (!rawValue || !hashedValue) {
      throw new BadRequestException('Value and hash are required');
    }
    try {
      const input = this.pepper ? `${rawValue}${this.pepper}` : rawValue;
      return await argon2.verify(hashedValue, input);
    } catch (e) {
      this.logger.error(
        'Failed to verify password',
        e instanceof Error ? e.stack : String(e),
      );
      throw new InternalServerErrorException('Verification failed');
    }
  }

  /**
   * Generates a secure temporary password containing at least one lowercase letter,
   * one uppercase letter, one digit, and one special character. The remaining characters
   * are randomly selected from all allowed character sets.
   *
   * @param length - The desired length of the generated password. Must be at least 8. Defaults to 12.
   * @returns A randomly generated temporary password string.
   * @throws {BadRequestException} If the specified length is less than 8.
   */
  generateTemporaryPassword(length: number = 12): string {
    if (length < 8) {
      throw new BadRequestException('Password length too short');
    }
    const lowers = 'abcdefghijklmnopqrstuvwxyz';
    const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specials = '!@#$%^&*()-_+=';
    const all = lowers + uppers + digits + specials;

    const pick = (set: string) => set[randomInt(0, set.length)];
    const chars = [
      pick(lowers),
      pick(uppers),
      pick(digits),
      pick(specials),
      ...Array.from({ length: length - 4 }, () => pick(all)),
    ];

    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomInt(0, i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  }

  /**
   * Generates a unique token as a URL-safe base64 string.
   *
   * @param bytes - The number of random bytes to generate for the token. Defaults to 32.
   * @returns A unique, URL-safe base64 encoded token string.
   */
  generateUniqueToken(bytes: number = 32): string {
    return randomBytes(bytes).toString('base64url');
  }
}

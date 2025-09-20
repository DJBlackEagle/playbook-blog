import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { MongooseQueryService } from '@ptc-org/nestjs-query-mongoose';
import { Model } from 'mongoose';
import { EncryptionService } from '../../../modules/encryption';
import { UserEntity, UserEntityModel } from './entities/user.entity';

/**
 * Service for managing user entities and authentication logic.
 *
 * Extends the MongooseQueryService to provide CRUD and query operations for UserEntity.
 * Handles user authentication, password verification, refresh token management, and login tracking.
 */
@QueryService(UserEntity)
export class UserService extends MongooseQueryService<UserEntity> {
  private readonly logger: Logger = new Logger(UserService.name);

  /**
   * Constructs the UserService.
   *
   * @param model - The injected Mongoose model for UserEntity.
   * @param encryptionService - Service for password encryption and verification.
   */
  constructor(
    @InjectModel(UserEntityModel.name) model: Model<UserEntity>,
    private readonly encryptionService: EncryptionService,
  ) {
    super(model);
  }

  /**
   * Finds a user by username or email identifier.
   *
   * @param identifier - The username or email to search for.
   * @returns The found user entity or null if not found.
   */
  async findByIdentifier(identifier: string): Promise<UserEntity | null> {
    this.logger.debug('findByIdentifier called');

    const [user] = await this.query({
      filter: {
        or: [{ username: { eq: identifier } }, { email: { eq: identifier } }],
      },
      paging: { limit: 1 },
    });

    return user;
  }

  /**
   * Verifies a user's password by comparing the raw password with the stored hash.
   *
   * @param userId - The user's unique identifier.
   * @param rawPassword - The plain text password to verify.
   * @returns True if the password is valid, false otherwise.
   */
  async verifyPassword(userId: string, rawPassword: string): Promise<boolean> {
    this.logger.debug('verifyPassword called');

    const user = await this.getById(userId);
    if (!user) return false;

    return this.encryptionService.verify(rawPassword, user.password);
  }

  /**
   * Sets the refresh token hash for a user.
   *
   * @param userId - The user's unique identifier.
   * @param refreshTokenHash - The hashed refresh token to store.
   * @returns The updated user entity or null if not found.
   */
  async setRefreshToken(
    userId: string,
    refreshTokenHash: string,
  ): Promise<UserEntity | null> {
    this.logger.debug('setRefreshToken called');

    return this.updateOne(userId, { refreshTokenHash });
  }

  /**
   * Unsets (removes) the refresh token hash for a user.
   *
   * @param userId - The user's unique identifier.
   * @returns The updated user entity or null if not found.
   */
  async unSetRefreshToken(userId: string): Promise<UserEntity | null> {
    this.logger.debug('unSetRefreshToken called');

    await this.Model.updateOne(
      { _id: userId },
      { $unset: { refreshTokenHash: 1 } },
    );

    return this.getById(userId);
  }

  /**
   * Checks if a user is currently logged in (has a refresh token set).
   *
   * @param userId - The user's unique identifier.
   * @returns True if the user is logged in, false otherwise.
   */
  async isLoggedIn(userId: string): Promise<boolean> {
    this.logger.debug('isLoggedIn called');

    const user = await this.getById(userId);
    if (!user) return false;

    return !!user.refreshTokenHash;
  }

  /**
   * Updates the user's last login timestamp to the current date and time.
   *
   * @param userId - The user's unique identifier.
   * @returns The updated user entity or null if not found.
   */
  async setLastLogin(userId: string): Promise<UserEntity | null> {
    this.logger.debug('setLastLogin called');

    return this.updateOne(userId, { lastLogin: new Date() });
  }
}

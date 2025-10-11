import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { MongooseQueryService } from '@ptc-org/nestjs-query-mongoose';
import { Model, Types } from 'mongoose';
import { EncryptionService } from '../../../modules/encryption';
import { UserSessionEntity } from './entities/user-session.entiy';
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
    const [user] = await this.query({
      filter: {
        or: [{ username: { eq: identifier } }, { email: { eq: identifier } }],
      },
      paging: { limit: 1 },
    });

    return user ?? null;
  }

  /**
   * Verifies a user's password by comparing the raw password with the stored hash.
   *
   * @param userId - The user's unique identifier.
   * @param rawPassword - The plain text password to verify.
   * @returns True if the password is valid, false otherwise.
   */
  async verifyPassword(userId: string, rawPassword: string): Promise<boolean> {
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
    return this.updateOne(userId, { refreshTokenHash });
  }

  /**
   * Unsets (removes) the refresh token hash for a user.
   *
   * @param userId - The user's unique identifier.
   * @returns The updated user entity or null if not found.
   */
  async unSetRefreshToken(userId: string): Promise<UserEntity | null> {
    await this.Model.updateOne(
      { _id: userId },
      { $unset: { refreshTokenHash: 1 } },
    );

    return this.getById(userId);
  }

  /**
   * Checks if a user has a valid, non-expired session for a given tokenId.
   * This method is optimized to perform the check directly in the database.
   *
   * @param userId - The user's unique identifier.
   * @param tokenId - The session's token identifier.
   * @returns The user entity if a valid session is found, otherwise null.
   */
  async isLoggedIn(
    userId: string,
    tokenId: string,
  ): Promise<UserEntity | null> {
    try {
      const user = await this.Model.findOne({
        _id: userId,
        sessions: {
          $elemMatch: {
            'authToken.tokenId': new Types.ObjectId(tokenId),
            'authToken.validUntil': { $gt: new Date() },
          },
        },
      }).exec();

      return user;
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        errorMessage = (error as { message: string }).message;
      }
      this.logger.error(
        `Invalid tokenId format or query failed: ${errorMessage}`,
      );
      throw error;
    }
  }

  /**
   * Updates the user's last login timestamp to the current date and time.
   *
   * @param userId - The user's unique identifier.
   * @returns The updated user entity or null if not found.
   */
  async setLastLogin(userId: string): Promise<UserEntity | null> {
    return this.updateOne(userId, { lastLogin: new Date() });
  }

  /**
   * Creates a new user session with access and refresh token details.
   *
   * Adds a session entry to the user's sessions array, including token validity and hashes.
   *
   * @param userId - The user's unique identifier.
   * @param tokenId - The unique token identifier for the session.
   * @param tokenValidSince - The date/time when the access token became valid.
   * @param tokenValidUntil - The date/time when the access token expires.
   * @param tokenHash - The hashed value of the access token.
   * @param refreshTokenValidSince - The date/time when the refresh token became valid.
   * @param refreshTokenValidUntil - The date/time when the refresh token expires.
   * @param refreshTokenHash - The hashed value of the refresh token.
   * @returns The updated user entity with the new session, or null if not found or update fails.
   */
  async createSession(
    userId: string,
    tokenId: string,
    tokenValidSince: Date,
    tokenValidUntil: Date,
    tokenHash: string,
    refreshTokenValidSince: Date,
    refreshTokenValidUntil: Date,
    refreshTokenHash: string,
  ): Promise<UserEntity | null> {
    const userSession: UserSessionEntity = {
      authToken: {
        tokenId: new Types.ObjectId(tokenId),
        validSince: tokenValidSince,
        validUntil: tokenValidUntil,
        hash: tokenHash,
      },
      refreshToken: {
        tokenId: new Types.ObjectId(tokenId),
        validSince: refreshTokenValidSince,
        validUntil: refreshTokenValidUntil,
        hash: refreshTokenHash,
      },
    };

    try {
      const updatedUser = await this.Model.findOneAndUpdate(
        { _id: userId },
        { $push: { sessions: userSession } },
        { new: true },
      ).exec();

      if (!updatedUser) {
        this.logger.warn(
          `The findOneAndUpdate operation did not return an updated user for ID: ${userId}`,
        );

        return null;
      }

      return updatedUser;
    } catch (error) {
      this.logger.error('Error during user.updateOne call:', error);
      return null;
    }
  }
}

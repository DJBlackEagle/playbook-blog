import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { MongooseQueryService } from '@ptc-org/nestjs-query-mongoose';
import { Model } from 'mongoose';
import { EncryptionService } from '../../../modules/encryption';
import { UserEntity, UserEntityModel } from './entities/user.entity';

@QueryService(UserEntity)
export class UserService extends MongooseQueryService<UserEntity> {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserEntityModel.name) model: Model<UserEntity>,
    private readonly encryptionService: EncryptionService,
  ) {
    super(model);
  }

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

  async verifyPassword(userId: string, rawPassword: string): Promise<boolean> {
    this.logger.debug('verifyPassword called');

    const user = await this.getById(userId);
    if (!user) return false;

    return this.encryptionService.verify(rawPassword, user.password);
  }

  async setRefreshToken(
    userId: string,
    refreshTokenHash: string,
  ): Promise<UserEntity | null> {
    this.logger.debug('setRefreshToken called');

    return this.updateOne(userId, { refreshTokenHash });
  }

  async unSetRefreshToken(userId: string): Promise<UserEntity | null> {
    this.logger.debug('unSetRefreshToken called');

    await this.Model.updateOne(
      { _id: userId },
      { $unset: { refreshTokenHash: 1 } },
    );

    return this.getById(userId);
  }

  async isLoggedIn(userId: string): Promise<boolean> {
    this.logger.debug('isLoggedIn called');

    const user = await this.getById(userId);
    if (!user) return false;

    return !!user.refreshTokenHash;
  }

  async setLastLogin(userId: string): Promise<UserEntity | null> {
    this.logger.debug('setLastLogin called');

    return this.updateOne(userId, { lastLogin: new Date() });
  }
}

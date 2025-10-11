/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { EncryptionService } from '../../../modules/encryption';
import { UserSessionEntity } from './entities/user-session.entiy';
import { UserEntity, UserEntityModel } from './entities/user.entity';
import { UserService } from './user.service';

const mockUser: Partial<UserEntity> = {
  _id: new Types.ObjectId('60d5ec49e7a9f72e8c5e6a3b'),
  username: 'testuser',
  email: 'test@example.com',
  password: 'hashedPassword',
  sessions: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date(),
};

const mockEncryptionService = {
  verify: jest.fn(),
};

class MockUserModel {
  constructor(public data: any) {}
  static find = jest.fn();
  static findOne = jest.fn().mockReturnThis();
  static findOneAndUpdate = jest.fn().mockReturnThis();
  static updateOne = jest.fn().mockReturnThis();
  static exec = jest.fn();
  save = jest.fn();
}

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(UserEntityModel.name),
          useValue: MockUserModel,
        },
        {
          provide: EncryptionService,
          useValue: mockEncryptionService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserEntity>>(getModelToken(UserEntityModel.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByIdentifier', () => {
    it('should find a user by username', async () => {
      jest.spyOn(service, 'query').mockResolvedValue([mockUser as UserEntity]);
      const result = await service.findByIdentifier('testuser');
      expect(result).toEqual(mockUser);
      expect(service.query).toHaveBeenCalledWith({
        filter: {
          or: [{ username: { eq: 'testuser' } }, { email: { eq: 'testuser' } }],
        },
        paging: { limit: 1 },
      });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(service, 'query').mockResolvedValue([]);
      const result = await service.findByIdentifier('nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('verifyPassword', () => {
    it('should return true for a correct password', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(mockUser as UserEntity);
      mockEncryptionService.verify.mockReturnValue(true);
      const result = await service.verifyPassword(
        (mockUser._id as Types.ObjectId).toHexString(),
        'password',
      );
      expect(result).toBe(true);
      expect(mockEncryptionService.verify).toHaveBeenCalledWith(
        'password',
        mockUser.password,
      );
    });

    it('should return false for an incorrect password', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(mockUser as UserEntity);
      mockEncryptionService.verify.mockReturnValue(false);
      const result = await service.verifyPassword(
        (mockUser._id as Types.ObjectId).toHexString(),
        'wrongpassword',
      );
      expect(result).toBe(false);
    });

    it('should return false if user not found', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      jest.spyOn(service, 'getById').mockResolvedValue(null as any);
      const result = await service.verifyPassword('nonexistentid', 'password');
      expect(result).toBe(false);
    });
  });

  describe('setRefreshToken', () => {
    it('should set the refresh token hash', async () => {
      const updatedUser = { ...mockUser, refreshTokenHash: 'newHash' };
      jest
        .spyOn(service, 'updateOne')
        .mockResolvedValue(updatedUser as UserEntity);
      const result = await service.setRefreshToken(
        (mockUser._id as Types.ObjectId).toHexString(),
        'newHash',
      );
      expect(result).toEqual(updatedUser);
      expect(service.updateOne).toHaveBeenCalledWith(
        (mockUser._id as Types.ObjectId).toHexString(),
        {
          refreshTokenHash: 'newHash',
        },
      );
    });
  });

  describe('unSetRefreshToken', () => {
    it('should unset the refresh token hash', async () => {
      const userWithoutRefreshToken = { ...mockUser };
      delete (userWithoutRefreshToken as Partial<UserEntity>).refreshTokenHash;
      (model.updateOne as jest.Mock).mockResolvedValue({ nModified: 1 });
      jest
        .spyOn(service, 'getById')
        .mockResolvedValue(userWithoutRefreshToken as UserEntity);

      const result = await service.unSetRefreshToken(
        (mockUser._id as Types.ObjectId).toHexString(),
      );

      expect(model.updateOne).toHaveBeenCalledWith(
        { _id: (mockUser._id as Types.ObjectId).toHexString() },
        { $unset: { refreshTokenHash: 1 } },
      );
      expect(result).toEqual(userWithoutRefreshToken);
    });
  });

  describe('isLoggedIn', () => {
    it('should return user if a valid session is found', async () => {
      (model.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });
      const result = await service.isLoggedIn(
        (mockUser._id as Types.ObjectId).toHexString(),
        new Types.ObjectId().toHexString(),
      );
      expect(result).toEqual(mockUser);
    });

    it('should return null if no valid session is found', async () => {
      (model.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      const result = await service.isLoggedIn(
        (mockUser._id as Types.ObjectId).toHexString(),
        new Types.ObjectId().toHexString(),
      );
      expect(result).toBeNull();
    });

    it('should throw an error for an invalid tokenId', async () => {
      const expectedError =
        'input must be a 24 character hex string, 12 byte Uint8Array, or an integer';
      await expect(
        service.isLoggedIn(
          (mockUser._id as Types.ObjectId).toHexString(),
          'invalid-id',
        ),
      ).rejects.toThrow(expectedError);
    });
  });

  describe('setLastLogin', () => {
    it("should update user's last login", async () => {
      const updatedUser = { ...mockUser, lastLogin: new Date() };
      jest
        .spyOn(service, 'updateOne')
        .mockResolvedValue(updatedUser as UserEntity);
      const result = await service.setLastLogin(
        (mockUser._id as Types.ObjectId).toHexString(),
      );
      expect(result).toEqual(updatedUser);

      expect(service.updateOne).toHaveBeenCalledWith(
        (mockUser._id as Types.ObjectId).toHexString(),
        {
          lastLogin: expect.any(Date) as Date,
        },
      );
    });
  });

  describe('createSession', () => {
    type SessionData = {
      userId: string;
      tokenId: string;
      tokenValidSince: Date;
      tokenValidUntil: Date;
      tokenHash: string;
      refreshTokenValidSince: Date;
      refreshTokenValidUntil: Date;
      refreshTokenHash: string;
    };

    const sessionData: SessionData = {
      userId: (mockUser._id as Types.ObjectId).toHexString(),
      tokenId: new Types.ObjectId().toHexString(),
      tokenValidSince: new Date(),
      tokenValidUntil: new Date(),
      tokenHash: 'tokenHash',
      refreshTokenValidSince: new Date(),
      refreshTokenValidUntil: new Date(),
      refreshTokenHash: 'refreshTokenHash',
    };

    it('should create a new session for a user', async () => {
      const updatedUser = {
        ...mockUser,
        sessions: [{} as UserSessionEntity],
      };
      (model.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedUser),
      });

      const result = await service.createSession(
        sessionData.userId,
        sessionData.tokenId,
        sessionData.tokenValidSince,
        sessionData.tokenValidUntil,
        sessionData.tokenHash,
        sessionData.refreshTokenValidSince,
        sessionData.refreshTokenValidUntil,
        sessionData.refreshTokenHash,
      );

      expect(result).toEqual(updatedUser);

      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: sessionData.userId },
        {
          $push: {
            sessions: expect.objectContaining({
              authToken: expect.objectContaining({
                tokenId: expect.any(Types.ObjectId),
                hash: expect.any(String),
              }),
              refreshToken: expect.objectContaining({
                tokenId: expect.any(Types.ObjectId),
                hash: expect.any(String),
              }),
            }),
          },
        },
        { new: true },
      );
    });

    it('should return null if findOneAndUpdate fails', async () => {
      (model.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await service.createSession(
        sessionData.userId,
        sessionData.tokenId,
        sessionData.tokenValidSince,
        sessionData.tokenValidUntil,
        sessionData.tokenHash,
        sessionData.refreshTokenValidSince,
        sessionData.refreshTokenValidUntil,
        sessionData.refreshTokenHash,
      );

      expect(result).toBeNull();
    });

    it('should return null on database error', async () => {
      const error = new Error('DB error');
      (model.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      const result = await service.createSession(
        sessionData.userId,
        sessionData.tokenId,
        sessionData.tokenValidSince,
        sessionData.tokenValidUntil,
        sessionData.tokenHash,
        sessionData.refreshTokenValidSince,
        sessionData.refreshTokenValidUntil,
        sessionData.refreshTokenHash,
      );

      expect(result).toBeNull();
    });
  });
});

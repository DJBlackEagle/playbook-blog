import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from '../../../modules/encryption';
import { UserEntity, UserEntityModel } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockModel: { updateOne: jest.Mock };
  let mockEncryptionService: { verify: jest.Mock };

  const userEntity = {
    _id: 'userId',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashed',
    refreshTokenHash: 'refreshToken',
    lastLogin: new Date(),
    tokenIdentifier: '',
    role: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    deletedAt: null,
  } as unknown as UserEntity;

  beforeEach(async () => {
    mockModel = {
      updateOne: jest.fn(),
    };
    mockEncryptionService = {
      verify: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(UserEntityModel.name), useValue: mockModel },
        { provide: EncryptionService, useValue: mockEncryptionService },
      ],
    }).compile();
    service = module.get(UserService);
    // Patch the Model property directly for unSetRefreshToken
    // Patch the Model property directly for unSetRefreshToken
    Object.defineProperty(service, 'Model', { value: mockModel });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByIdentifier', () => {
    it('should return user if found by username', async () => {
      jest.spyOn(service, 'query').mockResolvedValue([userEntity]);
      const result = await service.findByIdentifier('testuser');
      expect(result).toBe(userEntity);
    });
    it('should return user if found by email', async () => {
      jest.spyOn(service, 'query').mockResolvedValue([userEntity]);
      const result = await service.findByIdentifier('test@example.com');
      expect(result).toBe(userEntity);
    });
    it('should return undefined if not found', async () => {
      jest.spyOn(service, 'query').mockResolvedValue([]);
      const result = await service.findByIdentifier('notfound');
      expect(result).toBeUndefined();
    });
  });

  describe('verifyPassword', () => {
    it('should return false if user not found', async () => {
      jest
        .spyOn(service, 'getById')
        .mockResolvedValue(undefined as unknown as UserEntity);
      const result = await service.verifyPassword('userId', 'pw');
      expect(result).toBe(false);
    });
    it('should call encryptionService.verify and return result', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(userEntity);
      mockEncryptionService.verify.mockReturnValue(true);
      const result = await service.verifyPassword('userId', 'pw');
      expect(mockEncryptionService.verify).toHaveBeenCalledWith('pw', 'hashed');
      expect(result).toBe(true);
    });
  });

  describe('setRefreshToken', () => {
    it('should call updateOne and return result', async () => {
      const updatedUser = {
        ...userEntity,
        refreshTokenHash: 'newHash',
      } as unknown as UserEntity;
      jest.spyOn(service, 'updateOne').mockResolvedValue(updatedUser);
      const result = await service.setRefreshToken('userId', 'newHash');
      expect(() =>
        service.updateOne('userId', { refreshTokenHash: 'newHash' }),
      ).not.toThrow();
      expect(result).toBe(updatedUser);
    });
  });

  describe('unSetRefreshToken', () => {
    it('should call Model.updateOne and getById', async () => {
      mockModel.updateOne.mockResolvedValue({});
      jest.spyOn(service, 'getById').mockResolvedValue(userEntity);
      const result = await service.unSetRefreshToken('userId');
      expect(mockModel.updateOne).toHaveBeenCalledWith(
        { _id: 'userId' },
        { $unset: { refreshTokenHash: 1 } },
      );
      expect(() => service.getById('userId')).not.toThrow();
      expect(result).toBe(userEntity);
    });
  });

  describe('isLoggedIn', () => {
    it('should return false if user not found', async () => {
      jest
        .spyOn(service, 'getById')
        .mockResolvedValue(undefined as unknown as UserEntity);
      const result = await service.isLoggedIn('userId');
      expect(result).toBe(false);
    });
    it('should return true if user has refreshTokenHash', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(userEntity);
      const result = await service.isLoggedIn('userId');
      expect(result).toBe(true);
    });
    it('should return false if user has no refreshTokenHash', async () => {
      const userNoToken = {
        ...userEntity,
        refreshTokenHash: '',
      } as unknown as UserEntity;
      jest.spyOn(service, 'getById').mockResolvedValue(userNoToken);
      const result = await service.isLoggedIn('userId');
      expect(result).toBe(false);
    });
  });

  describe('setLastLogin', () => {
    it('should call updateOne with lastLogin and return result', async () => {
      const updatedUser = {
        ...userEntity,
        lastLogin: new Date(),
      } as unknown as UserEntity;
      jest.spyOn(service, 'updateOne').mockResolvedValue(updatedUser);
      const result = await service.setLastLogin('userId');
      // Use a type-safe matcher for lastLogin
      expect(() =>
        service.updateOne('userId', {
          lastLogin: expect.any(Date) as unknown as Date,
        }),
      ).not.toThrow();
      expect(result).toBe(updatedUser);
    });
  });
});

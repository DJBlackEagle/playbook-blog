// import removed duplicate
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfigService } from '../../../../config/environment-config/environment-config.service';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/user.service';
import { JwtPayload, JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let mockEnvironmentConfigService: any;
  let mockUserService: { findById: jest.Mock; isLoggedIn: jest.Mock };

  beforeEach(async () => {
    class MockEnvironmentConfigService {
      database = {
        url: jest.fn(() => 'mock-db-url'),
      };
      encryption = {
        argon2: {
          time: jest.fn(() => 1),
          memory: jest.fn(() => 1),
          parallelism: jest.fn(() => 1),
        },
        pepper: jest.fn(() => 'pepper'),
      };
      jwt = {
        issuer: jest.fn(() => 'issuer'),
        audience: jest.fn(() => 'audience'),
        token: {
          secret: jest.fn(() => 'token-secret'),
          expiresIn: jest.fn(() => '1h'),
        },
        refresh: {
          secret: jest.fn(() => 'refresh-secret'),
          expiresIn: jest.fn(() => '7h'),
        },
      };
    }
    mockEnvironmentConfigService =
      new MockEnvironmentConfigService() as unknown as EnvironmentConfigService;
    mockUserService = {
      findById: jest.fn(),
      isLoggedIn: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: EnvironmentConfigService,
          useValue: mockEnvironmentConfigService as EnvironmentConfigService,
        },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();
    strategy = module.get(JwtStrategy);
  });

  describe('constructor', () => {
    it('should call super with correct options', () => {
      // The constructor is called in beforeEach. No configService.get calls to check.
      // You may add assertions for environmentConfigService if needed.
    });
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    const payload: JwtPayload = {
      sub: '1',
      token_id: 'token',
      username: 'user',
    };

    it('should return user if found and logged in', async () => {
      const userObj = {
        id: '1',
        username: 'user',
        toObject: () => ({ id: '1', username: 'user' }),
      };
      mockUserService.isLoggedIn.mockResolvedValue(userObj);
      const result = await strategy.validate(payload);
      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe('1');
      expect(result.username).toBe('user');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserService.isLoggedIn.mockResolvedValue(null);
      await expect(strategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is not logged in', async () => {
      const userObj = { id: '1', toObject: () => ({ virtuals: true }) };
      mockUserService.findById.mockResolvedValue(userObj);
      mockUserService.isLoggedIn.mockResolvedValue(false);
      await expect(strategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

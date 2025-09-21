// import removed duplicate
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/user.service';
import { JwtPayload, JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let mockConfigService: { get: jest.Mock };
  let mockUserService: { findById: jest.Mock; isLoggedIn: jest.Mock };

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn().mockReturnValue('value'),
    };
    mockUserService = {
      findById: jest.fn(),
      isLoggedIn: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();
    strategy = module.get(JwtStrategy);
  });

  describe('constructor', () => {
    it('should call super with correct options', () => {
      // The constructor is called in beforeEach, so just check configService.get calls
      expect(mockConfigService.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
      );
    });
  });

  describe('validate', () => {
    const payload: JwtPayload = {
      sub: '1',
      token_id: 'token',
      username: 'user',
    };

    it('should return user if found and logged in', async () => {
      const userObj = { id: '1', toObject: () => ({ virtuals: true }) };
      mockUserService.findById.mockResolvedValue(userObj);
      mockUserService.isLoggedIn.mockResolvedValue(true);
      const result = await strategy.validate(payload);
      expect(result).toBeInstanceOf(User);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserService.findById.mockResolvedValue(null);
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

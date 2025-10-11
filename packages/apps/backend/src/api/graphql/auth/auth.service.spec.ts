/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfigService } from '../../../config/environment-config/environment-config.service';
import { EncryptionService } from '../../../modules/encryption';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

// Mocks
const mockUserService = {
  findByIdentifier: jest.fn(),
  verifyPassword: jest.fn(),
  setLastLogin: jest.fn(),
  setRefreshToken: jest.fn(),
  unSetRefreshToken: jest.fn(),
  getById: jest.fn(),
  createSession: jest.fn(),
};
const mockJwtService = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};
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
const mockEncryptionService = {
  hash: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: EnvironmentConfigService,
          useValue: new MockEnvironmentConfigService(),
        },
        { provide: EncryptionService, useValue: mockEncryptionService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('private methods', () => {
    it('should sign access token', async () => {
      const payload = { sub: '1', username: 'test', token_id: '' };
      mockJwtService.signAsync.mockResolvedValue('signed-access');

      const result = await (service as any).signAccessToken(payload);
      expect(result).toBe('signed-access');
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        payload,
        expect.any(Object),
      );
    });

    it('should sign refresh token', async () => {
      const payload = { sub: '1', username: 'test', token_id: '' };
      mockJwtService.signAsync.mockResolvedValue('signed-refresh');

      const result = await (service as any).signRefreshToken(payload);
      expect(result).toBe('signed-refresh');
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        payload,
        expect.any(Object),
      );
    });

    it('should issue token pair', async () => {
      const user = {
        id: '1',
        username: 'test',
        toObject: () => ({ virtuals: true }),
      };
      mockJwtService.signAsync
        .mockResolvedValueOnce('access')
        .mockResolvedValueOnce('refresh');
      mockEncryptionService.hash.mockResolvedValue('hashed-refresh');
      mockUserService.createSession.mockResolvedValue({
        toObject: () => ({ virtuals: true }),
      });
      const result = await (service as any).issueTokenPair(user);
      expect(result).toEqual({
        accessToken: 'access',
        refreshToken: 'refresh',
        user: expect.anything(),
      });
      expect(mockEncryptionService.hash).toHaveBeenCalledWith('refresh');
      expect(mockUserService.createSession).toHaveBeenCalled();
    });

    it('should throw if createSession fails in issueTokenPair', async () => {
      const user = {
        id: '1',
        username: 'test',
        toObject: () => ({ virtuals: true }),
      };
      mockJwtService.signAsync
        .mockResolvedValueOnce('access')
        .mockResolvedValueOnce('refresh');
      mockEncryptionService.hash.mockResolvedValue('hashed-refresh');
      mockUserService.createSession.mockResolvedValue(null);
      await expect((service as any).issueTokenPair(user)).rejects.toThrow(
        'Failed to create user session',
      );
    });
  });

  describe('login', () => {
    it('should login and return Login', async () => {
      const user = { id: '1', username: 'test', toObject: () => ({}) };
      const loginInput = { identifier: 'test', password: 'pw' };
      const loginResult = { accessToken: 'a', refreshToken: 'r', user: {} };
      mockUserService.findByIdentifier.mockResolvedValue(user);
      mockUserService.verifyPassword.mockResolvedValue(true);
      mockUserService.setLastLogin.mockResolvedValue(true);
      jest
        .spyOn(service, 'issueTokenPair' as any)
        .mockResolvedValue(loginResult);
      const result = await service.login(loginInput);
      expect(result).toBe(loginResult);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUserService.findByIdentifier.mockResolvedValue(null);
      await expect(
        service.login({ identifier: 'x', password: 'y' }),
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException if password invalid', async () => {
      const user = { id: '1', username: 'test', toObject: () => ({}) };
      mockUserService.findByIdentifier.mockResolvedValue(user);
      mockUserService.verifyPassword.mockResolvedValue(false);
      await expect(
        service.login({ identifier: 'x', password: 'y' }),
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw if setLastLogin fails', async () => {
      const user = { id: '1', username: 'test', toObject: () => ({}) };
      const loginInput = { identifier: 'test', password: 'pw' };
      const loginResult = { accessToken: 'a', refreshToken: 'r', user: {} };
      mockUserService.findByIdentifier.mockResolvedValue(user);
      mockUserService.verifyPassword.mockResolvedValue(true);
      mockUserService.setLastLogin.mockResolvedValue(false);
      jest
        .spyOn(service, 'issueTokenPair' as any)
        .mockResolvedValue(loginResult);
      await expect(service.login(loginInput)).rejects.toThrow(
        'Failed to set last login',
      );
    });
  });

  describe('logout', () => {
    it('should return success true if unSetRefreshToken returns true', async () => {
      mockUserService.unSetRefreshToken.mockResolvedValue(true);
      const result = await service.logout('1');
      expect(result).toEqual({ success: true });
    });

    it('should return success false if unSetRefreshToken returns false', async () => {
      mockUserService.unSetRefreshToken.mockResolvedValue(false);
      const result = await service.logout('1');
      expect(result).toEqual({ success: false });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token and return Login', async () => {
      const input = { refreshToken: 'refresh' };
      const payload = { sub: '1', username: 'test', token_id: '' };
      const user = {
        id: '1',
        username: 'test',
        refreshTokenHash: 'hash',
        toObject: () => ({}),
      };
      const loginResult = { accessToken: 'a', refreshToken: 'r', user: {} };
      mockJwtService.verifyAsync.mockResolvedValue(payload);
      mockUserService.getById.mockResolvedValue(user);
      mockEncryptionService.verify.mockResolvedValue(true);
      jest
        .spyOn(service as any, 'issueTokenPair')
        .mockResolvedValue(loginResult);
      const result = await service.refreshToken(input);
      expect(result).toBe(loginResult);
    });

    it('should throw UnauthorizedException if jwtService.verifyAsync throws', async () => {
      mockJwtService.verifyAsync.mockRejectedValue(new Error('fail'));
      await expect(
        service.refreshToken({ refreshToken: 'bad' }),
      ).rejects.toThrow();
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockJwtService.verifyAsync.mockResolvedValue({ sub: '1' });
      mockUserService.getById.mockResolvedValue(null);
      await expect(
        service.refreshToken({ refreshToken: 'bad' }),
      ).rejects.toThrow();
    });

    it('should throw UnauthorizedException if user.refreshTokenHash is missing', async () => {
      mockJwtService.verifyAsync.mockResolvedValue({ sub: '1' });
      mockUserService.getById.mockResolvedValue({ id: '1' });
      await expect(
        service.refreshToken({ refreshToken: 'bad' }),
      ).rejects.toThrow();
    });

    it('should throw UnauthorizedException if encryptionService.verify returns false', async () => {
      mockJwtService.verifyAsync.mockResolvedValue({ sub: '1' });
      mockUserService.getById.mockResolvedValue({
        id: '1',
        refreshTokenHash: 'hash',
      });
      mockEncryptionService.verify.mockResolvedValue(false);
      await expect(
        service.refreshToken({ refreshToken: 'bad' }),
      ).rejects.toThrow();
    });
  });
});

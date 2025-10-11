import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
// import { GqlAuthGuard } from '../../../common/guards/gql-auth.guard';
import { User } from '../user/models/user.model';
import { LoginInput } from './inputs/login.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
import { Login } from './models/login.model';
import { Logout } from './models/logout.model';
// import { ExecutionContext } from '@nestjs/common';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  const mockAuthService = {
    login: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should login and return Login', async () => {
      const input: LoginInput = {
        identifier: 'user',
        password: 'pass',
      } as LoginInput;
      const loginResult: Login = {
        accessToken: 'token',
        refreshToken: 'refresh',
        user: {} as User,
      };
      mockAuthService.login.mockResolvedValue(loginResult);
      await expect(resolver.login(input)).resolves.toEqual(loginResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(input);
    });

    it('should throw if AuthService.login throws', async () => {
      const input: LoginInput = {
        identifier: 'user',
        password: 'pass',
      } as LoginInput;
      mockAuthService.login.mockRejectedValue(new Error('Login failed'));
      await expect(resolver.login(input)).rejects.toThrow('Login failed');
    });
  });

  describe('logout', () => {
    it('should logout and return Logout', async () => {
      const user: User = { id: '123' } as User;
      const logoutResult: Logout = { success: true } as Logout;
      mockAuthService.logout.mockResolvedValue(logoutResult);
      await expect(resolver.logout(user)).resolves.toEqual(logoutResult);
      expect(mockAuthService.logout).toHaveBeenCalledWith(user.id);
    });

    it('should throw if AuthService.logout throws', async () => {
      const user: User = { id: '123' } as User;
      mockAuthService.logout.mockRejectedValue(new Error('Logout failed'));
      await expect(resolver.logout(user)).rejects.toThrow('Logout failed');
    });
  });

  describe('refreshToken', () => {
    it('should refresh token and return Login', async () => {
      const input: RefreshTokenInput = {
        refreshToken: 'refresh',
      } as RefreshTokenInput;
      const loginResult: Login = {
        accessToken: 'token',
        refreshToken: 'refresh2',
        user: {} as User,
      };
      mockAuthService.refreshToken.mockResolvedValue(loginResult);
      await expect(resolver.refreshToken(input)).resolves.toEqual(loginResult);
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(input);
    });

    it('should throw if AuthService.refreshToken throws', async () => {
      const input: RefreshTokenInput = {
        refreshToken: 'refresh',
      } as RefreshTokenInput;
      mockAuthService.refreshToken.mockRejectedValue(
        new Error('Refresh failed'),
      );
      await expect(resolver.refreshToken(input)).rejects.toThrow(
        'Refresh failed',
      );
    });
  });

  describe('me', () => {
    it('should return the current user', () => {
      const user: User = { id: '123', username: 'test' } as User;
      expect(resolver.me(user)).toBe(user);
    });

    it('should return undefined if user is undefined', () => {
      // @ts-expect-error: testing undefined user
      expect(resolver.me(undefined)).toBeUndefined();
    });
  });
});

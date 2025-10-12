import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../../common/decorators';
import { GqlAuthGuard } from '../../../common/guards';
import { User } from '../user/models/user.model';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
import { Login } from './models/login.model';
import { Logout } from './models/logout.model';

/**
 * GraphQL resolver for authentication operations.
 *
 * Handles login, logout, token refresh, and current user queries.
 */
@Resolver()
export class AuthResolver {
  /**
   * Constructs the AuthResolver.
   *
   * @param authService - The authentication service.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs in a user with identifier and password.
   *
   * @param loginInput - The login credentials.
   * @returns {Promise<Login>} The login response with tokens and user info.
   */
  @Mutation(() => Login, {
    name: 'login',
    description: 'Login with identifier and password',
  })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Login> {
    return this.authService.login(loginInput);
  }

  /**
   * Logs out the current user and invalidates their refresh token.
   *
   * @param user - The current user.
   * @returns {Promise<Logout>} The logout response.
   */
  @Mutation(() => Logout, {
    name: 'logout',
    description: 'Logout user and invalidate refresh token',
  })
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: User): Promise<Logout> {
    return this.authService.logout(user.id);
  }

  /**
   * Rotates the refresh token and issues a new access token.
   *
   * @param refreshTokenInput - The input containing the refresh token.
   * @returns {Promise<Login>} The login response with new tokens.
   */
  @Mutation(() => Login, {
    name: 'refreshToken',
    description: 'Rotate refresh token and get a new access token',
  })
  @UseGuards(GqlAuthGuard)
  async refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
  ): Promise<Login> {
    return this.authService.refreshToken(refreshTokenInput);
  }

  /**
   * Returns the current authenticated user.
   *
   * @param user - The current user.
   * @returns {User} The current user.
   */
  @Query(() => User, { name: 'me', description: 'Get the current user' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }
}

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

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Login, {
    name: 'login',
    description: 'Login with identifier and password',
  })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Login> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => Logout, {
    name: 'logout',
    description: 'Logout user and invalidate refresh token',
  })
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: User): Promise<Logout> {
    return this.authService.logout(user.id);
  }

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

  @Query(() => User, { name: 'me', description: 'Get the current user' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }
}

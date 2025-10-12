import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { Types } from 'mongoose';
import { EnvironmentConfigService } from '../../../config/environment-config/environment-config.service';
import { EncryptionService } from '../../../modules/encryption';
import { DateCalc } from '../../../shared';
import { UserEntity } from '../user/entities/user.entity';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { LoginInput } from './inputs/login.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
import { Login } from './models/login.model';
import { Logout } from './models/logout.model';
import { JwtPayload } from './strategies/jwt.strategy';

/**
 * Service for handling authentication logic, including login, logout, and token refresh.
 *
 * Integrates with user, JWT, and encryption services to manage authentication flows.
 */
@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  /**
   * Constructs the AuthService.
   *
   * @param userService - Service for user entity operations.
   * @param jwtService - Service for JWT operations.
   * @param environmentConfigService - Service for accessing configuration values.
   * @param encryptionService - Service for password and token encryption/verification.
   */
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly environmentConfigService: EnvironmentConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Signs and returns a JWT access token for the given payload.
   *
   * @param payload - The JWT payload to sign.
   * @returns {Promise<string>} The signed JWT access token.
   */
  private async signAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.environmentConfigService.jwt.token.secret(),
      expiresIn: this.environmentConfigService.jwt.token.expiresIn(),
      issuer: this.environmentConfigService.jwt.issuer(),
      audience: this.environmentConfigService.jwt.audience(),
    });
  }

  /**
   * Signs and returns a JWT refresh token for the given payload.
   *
   * @param payload - The JWT payload to sign.
   * @returns {Promise<string>} The signed JWT refresh token.
   */
  private async signRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.environmentConfigService.jwt.refresh.secret(),
      expiresIn: this.environmentConfigService.jwt.refresh.expiresIn(),
      issuer: this.environmentConfigService.jwt.issuer(),
      audience: this.environmentConfigService.jwt.audience(),
    });
  }

  /**
   * Issues a new access/refresh token pair for the given user.
   *
   * Hashes and stores the refresh token for the user.
   *
   * @param user - The user entity for whom to issue tokens.
   * @returns {Promise<Login>} The login response containing tokens and user info.
   * @throws Error if the refresh token hash cannot be set.
   */
  private async issueTokenPair(user: UserEntity): Promise<Login> {
    const payload: JwtPayload = {
      sub: `${user.id}`,
      username: user.username,
      token_id: new Types.ObjectId().toHexString(),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    const tokenValidSince = new Date();
    const tokenValidUntil = DateCalc.add(
      this.environmentConfigService.jwt.token.expiresIn(),
      tokenValidSince,
    );
    const tokenHash = await this.encryptionService.hash(accessToken);
    const refreshTokenValidSince = tokenValidSince;
    const refreshTokenValidUntil = DateCalc.add(
      this.environmentConfigService.jwt.refresh.expiresIn(),
      refreshTokenValidSince,
    );
    const refreshTokenHash = await this.encryptionService.hash(refreshToken);

    this.logger.debug(`Creating session for userId: ${user.id}`);

    const userCreatedSession = await this.userService.createSession(
      `${user.id}`,
      payload.token_id,
      tokenValidSince,
      tokenValidUntil,
      tokenHash,
      refreshTokenValidSince,
      refreshTokenValidUntil,
      refreshTokenHash,
    );
    if (!userCreatedSession) throw new Error('Failed to create user session');

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: plainToClass(User, userCreatedSession.toObject({ virtuals: true })),
    };
  }

  /**
   * Authenticates a user and issues a new access/refresh token pair.
   *
   * @param loginInput - The login credentials (identifier and password).
   * @returns {Promise<Login>} The login response containing tokens and user info.
   * @throws UnauthorizedException if credentials are invalid.
   */
  async login(loginInput: LoginInput): Promise<Login> {
    const user = await this.userService.findByIdentifier(loginInput.identifier);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await this.userService.verifyPassword(
      `${user.id}`,
      loginInput.password,
    );
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const response = await this.issueTokenPair(user);
    if (!(await this.userService.setLastLogin(`${user.id}`)))
      throw new Error('Failed to set last login');

    return response;
  }

  /**
   * Logs out a user by unsetting their refresh token.
   *
   * @param userId - The user's unique identifier.
   * @returns {Promise<Logout>} The logout response indicating success or failure.
   */
  async logout(userId: string): Promise<Logout> {
    if (!(await this.userService.unSetRefreshToken(userId))) {
      return { success: false };
    }

    return { success: true };
  }

  /**
   * Refreshes the access and refresh tokens using a valid refresh token.
   *
   * @param refreshTokenInput - The input containing the refresh token.
   * @returns {Promise<Login>} The new login response with refreshed tokens.
   * @throws UnauthorizedException if the refresh token is invalid or user not found.
   */
  async refreshToken(refreshTokenInput: RefreshTokenInput): Promise<Login> {
    const payload = await this.jwtService
      .verifyAsync<JwtPayload>(refreshTokenInput.refreshToken, {
        secret: this.environmentConfigService.jwt.refresh.secret(),
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    const user = await this.userService.getById(payload.sub);
    if (!user || !user.refreshTokenHash) throw new UnauthorizedException();

    const tokenValid = await this.encryptionService.verify(
      refreshTokenInput.refreshToken,
      user.refreshTokenHash,
    );
    if (!tokenValid) throw new UnauthorizedException();

    return this.issueTokenPair(user);
  }
}

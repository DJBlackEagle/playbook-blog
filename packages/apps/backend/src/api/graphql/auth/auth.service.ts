import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { EncryptionService } from '../../../modules/encryption';
import { CONFIG } from '../../../shared';
import { UserEntity } from '../user/entities/user.entity';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { LoginInput } from './inputs/login.input';
import { RefreshTokenInput } from './inputs/refresh-token.input';
import { Login } from './models/login.model';
import { Logout } from './models/logout.model';
import { JwtPayload } from './stratgegies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}

  private async signAccessToken(payload: JwtPayload): Promise<string> {
    this.logger.debug('signAccessToken called');

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(
        CONFIG.JWT_SECRET.NAME,
        CONFIG.JWT_SECRET.DEFAULT_VALUE,
      ),
      expiresIn: this.configService.get<string>(
        CONFIG.JWT_EXPIRES_IN.NAME,
        CONFIG.JWT_EXPIRES_IN.DEFAULT_VALUE,
      ),
      issuer: this.configService.get<string>(
        CONFIG.JWT_ISSUER.NAME,
        CONFIG.JWT_ISSUER.DEFAULT_VALUE,
      ),
      audience: this.configService.get<string>(
        CONFIG.HOST.NAME,
        CONFIG.HOST.DEFAULT_VALUE,
      ),
    });
  }

  private async signRefreshToken(payload: JwtPayload): Promise<string> {
    this.logger.debug('signRefreshToken called');

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(
        CONFIG.JWT_REFRESH_SECRET.NAME,
        CONFIG.JWT_REFRESH_SECRET.DEFAULT_VALUE,
      ),
      expiresIn: this.configService.get<string>(
        CONFIG.JWT_REFRESH_EXPIRES_IN.NAME,
        CONFIG.JWT_REFRESH_EXPIRES_IN.DEFAULT_VALUE,
      ),
      issuer: this.configService.get<string>(
        CONFIG.JWT_ISSUER.NAME,
        CONFIG.JWT_ISSUER.DEFAULT_VALUE,
      ),
      audience: this.configService.get<string>(
        CONFIG.HOST.NAME,
        CONFIG.HOST.DEFAULT_VALUE,
      ),
    });
  }

  private async issueTokenPair(user: UserEntity): Promise<Login> {
    this.logger.debug('issueTokenPair called');

    const payload: JwtPayload = {
      sub: `${user.id}`,
      username: user.username,
      token_id: '',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    const rtHash = await this.encryptionService.hash(refreshToken);
    if (!(await this.userService.setRefreshToken(payload.sub, rtHash))) {
      this.logger.error('Failed to set refresh token hash');
      throw new Error('Failed to set refresh token hash');
    }

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: plainToClass(User, user.toObject({ virtuals: true })),
    };
  }

  async login(loginInput: LoginInput): Promise<Login> {
    this.logger.debug('login called');

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

  async logout(userId: string): Promise<Logout> {
    this.logger.debug('logout called');

    if (!(await this.userService.unSetRefreshToken(userId))) {
      return { success: false };
    }

    return { success: true };
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput): Promise<Login> {
    this.logger.debug('refreshToken called');

    const payload = await this.jwtService
      .verifyAsync<JwtPayload>(refreshTokenInput.refreshToken, {
        secret: this.configService.get<string>(
          CONFIG.JWT_REFRESH_SECRET.NAME,
          CONFIG.JWT_REFRESH_SECRET.DEFAULT_VALUE,
        ),
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

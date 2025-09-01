import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { ConfigDefaults } from '../../constants/config-default';
import { EncryptionService } from '../../modules/encryption/encryption.service';
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
        'JWT_SECRET',
        ConfigDefaults.JWT_SECRET,
      ),
      expiresIn: this.configService.get<string>(
        'JWT_EXPIRES_IN',
        ConfigDefaults.JWT_EXPIRES_IN,
      ),
      issuer: this.configService.get<string>(
        'JWT_ISSUER',
        ConfigDefaults.JWT_ISSUER,
      ),
      audience: this.configService.get<string>('HOST', ConfigDefaults.HOST),
    });
  }

  private async signRefreshToken(payload: JwtPayload): Promise<string> {
    this.logger.debug('signRefreshToken called');

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(
        'JWT_REFRESH_SECRET',
        ConfigDefaults.JWT_REFRESH_SECRET,
      ),
      expiresIn: this.configService.get<string>(
        'JWT_REFRESH_EXPIRES_IN',
        ConfigDefaults.JWT_REFRESH_EXPIRES_IN,
      ),
      issuer: this.configService.get<string>(
        'JWT_ISSUER',
        ConfigDefaults.JWT_ISSUER,
      ),
      audience: this.configService.get<string>('HOST', ConfigDefaults.HOST),
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
    console.log('User found:', user);

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
          'JWT_REFRESH_SECRET',
          ConfigDefaults.JWT_REFRESH_SECRET,
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

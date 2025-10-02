import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConfigService } from '../../../../config/environment-config/environment-config.service';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/user.service';

/**
 * Interface representing the structure of a JWT payload.
 */
export interface JwtPayload {
  /** The user ID (subject). */
  sub: string;
  /** The unique token identifier. */
  token_id: string;
  /** The username associated with the token. */
  username: string;
}

/**
 * Passport JWT strategy for validating and authenticating users in GraphQL context.
 *
 * Uses configuration values for secret, issuer, and audience. Validates the JWT payload,
 * checks user existence and login status, and transforms the user entity for use in resolvers.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructs the JwtStrategy with configuration and user service dependencies.
   *
   * @param environmentConfigService - Service for accessing environment/config values.
   * @param users - Service for user entity operations.
   */
  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
    private readonly users: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environmentConfigService.jwt.token.secret(),
      ignoreExpiration: false,
      issuer: environmentConfigService.jwt.issuer(),
      audience: environmentConfigService.jwt.audience(),
    });
  }

  /**
   * Validates the JWT payload and returns the authenticated user.
   *
   * @param payload - The decoded JWT payload.
   * @returns The authenticated user model.
   * @throws UnauthorizedException if the user does not exist or is not logged in.
   */
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.users.findById(payload.sub);
    if (!user) throw new UnauthorizedException();

    if (!(await this.users.isLoggedIn(payload.sub))) {
      throw new UnauthorizedException();
    }

    return plainToClass(User, user.toObject({ virtuals: true }));
  }
}

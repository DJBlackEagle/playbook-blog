import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigDefaults } from '../../../constants/config-default';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/user.service';

export interface JwtPayload {
  sub: string;
  token_id: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly users: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        ConfigDefaults.JWT_SECRET,
      ),
      ignoreExpiration: false,
      issuer: configService.get<string>(
        'JWT_ISSUER',
        ConfigDefaults.JWT_ISSUER,
      ),
      audience: configService.get<string>('HOST', ConfigDefaults.HOST),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.users.findById(payload.sub);
    if (!user) throw new UnauthorizedException();

    if (!(await this.users.isLoggedIn(payload.sub))) {
      throw new UnauthorizedException();
    }

    return plainToClass(User, user.toObject({ virtuals: true }));
  }
}

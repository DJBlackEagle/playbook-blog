/* eslint-disable @typescript-eslint/no-require-imports */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { type StringValue } from 'ms';
import { EnvironmentConfigModule } from '../../../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../../../config/environment-config/environment-config.service';
import { EncryptionModule } from '../../../modules/encryption';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import ms = require('ms');

/**
 * NestJS module for authentication and authorization.
 *
 * Registers authentication services, resolvers, strategies, and integrates with user and encryption modules.
 */
@Module({
  imports: [
    EnvironmentConfigModule,
    EncryptionModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (configService: EnvironmentConfigService) => ({
        secret: configService.jwt.token.secret(),
        signOptions: {
          expiresIn: ms(configService.jwt.token.expiresIn() as StringValue),
        },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EncryptionModule } from '../../../modules/encryption';
import { CONFIG } from '../../../shared';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stratgegies/jwt.strategy';

/**
 * NestJS module for authentication and authorization.
 *
 * Registers authentication services, resolvers, strategies, and integrates with user and encryption modules.
 */
@Module({
  imports: [
    ConfigModule,
    EncryptionModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(
          CONFIG.JWT_SECRET.NAME,
          CONFIG.JWT_SECRET.DEFAULT_VALUE,
        ),
        signOptions: {
          expiresIn: configService.get<string>(
            CONFIG.JWT_EXPIRES_IN.NAME,
            CONFIG.JWT_EXPIRES_IN.DEFAULT_VALUE,
          ),
        },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigDefaults } from '../../constants/config-default';
import { EncryptionModule } from '../../modules/encryption/encryption.module';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stratgegies/jwt.strategy';

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
          'JWT_SECRET',
          ConfigDefaults.JWT_SECRET,
        ),
        signOptions: {
          expiresIn: configService.get<string>(
            'JWT_EXPIRES_IN',
            ConfigDefaults.JWT_EXPIRES_IN,
          ),
        },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}

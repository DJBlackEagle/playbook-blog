import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileResolver } from '../../shared';

/**
 * Module responsible for providing environment-specific configuration settings.
 *
 * This module can be imported into other modules to access environment variables
 * and configuration values required by the application at runtime.
 *
 * @module EnvironmentConfigModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: FileResolver.getEnvFile(),
    }),
  ],
})
export class EnvironmentConfigModule {}

import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { EncryptionService } from './encryption.service';

/**
 * EncryptionModule
 *
 * Provides encryption and decryption services across the application.
 *
 * - Imports: EnvironmentConfigModule for accessing environment-based configuration.
 * - Providers: EncryptionService, which contains encryption logic.
 * - Exports: EncryptionService, making it available for injection in other modules.
 */
@Module({
  imports: [EnvironmentConfigModule],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}

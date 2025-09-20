import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionService } from './encryption.service';

/**
 * EncryptionModule
 *
 * Provides encryption and decryption services across the application.
 *
 * - Imports: ConfigModule for accessing environment-based configuration.
 * - Providers: EncryptionService, which contains encryption logic.
 * - Exports: EncryptionService, making it available for injection in other modules.
 */
@Module({
  imports: [ConfigModule],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}

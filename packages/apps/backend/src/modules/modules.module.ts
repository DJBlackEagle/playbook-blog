import { Module } from '@nestjs/common';
import { EncryptionModule } from './encryption/encryption.module';
import { TestingService } from './testing/testing.service';
import { TestingEncryptionModule } from './testing/testing-encryption/testing-encryption.module';

@Module({
  imports: [EncryptionModule, TestingEncryptionModule],
  providers: [TestingService],
})
export class ModulesModule {}

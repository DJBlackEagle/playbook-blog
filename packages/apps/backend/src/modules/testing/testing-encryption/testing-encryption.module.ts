import { Module } from '@nestjs/common';
import { EncryptionModule } from '../../encryption/encryption.module';
import { TestingEncryptionResolver } from './testing-encryption.resolver';
import { TestingEncryptionService } from './testing-encryption.service';

@Module({
  imports: [EncryptionModule],
  providers: [TestingEncryptionResolver, TestingEncryptionService],
})
export class TestingEncryptionModule {}

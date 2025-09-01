import { Test, TestingModule } from '@nestjs/testing';
import { TestingEncryptionResolver } from './testing-encryption.resolver';
import { TestingEncryptionService } from './testing-encryption.service';

describe('TestingEncryptionResolver', () => {
  let resolver: TestingEncryptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestingEncryptionResolver, TestingEncryptionService],
    }).compile();

    resolver = module.get<TestingEncryptionResolver>(TestingEncryptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

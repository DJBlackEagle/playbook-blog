import { Test, TestingModule } from '@nestjs/testing';
import { TestingEncryptionService } from './testing-encryption.service';

describe('TestingEncryptionService', () => {
  let service: TestingEncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestingEncryptionService],
    }).compile();

    service = module.get<TestingEncryptionService>(TestingEncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

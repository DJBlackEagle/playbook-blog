import { Test, TestingModule } from '@nestjs/testing';
import { AppInfoResolver } from './app-info.resolver';
import { AppInfoService } from './app-info.service';

describe('AppInfoResolver', () => {
  let resolver: AppInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppInfoResolver, AppInfoService],
    }).compile();

    resolver = module.get<AppInfoResolver>(AppInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

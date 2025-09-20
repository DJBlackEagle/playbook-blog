import { Test, TestingModule } from '@nestjs/testing';
import { AppInfoResolver } from './app-info.resolver';
import { AppInfoService } from './app-info.service';
import { AppInfo } from './models/app-info.model';

describe('AppInfoResolver', () => {
  let resolver: AppInfoResolver;
  let service: AppInfoService;

  const mockAppInfo: AppInfo = {
    name: 'TestApp',
    title: 'Test Application',
    description: 'A test app',
    version: '1.0.0',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppInfoResolver,
        {
          provide: AppInfoService,
          useValue: {
            appInfo: jest.fn().mockReturnValue(mockAppInfo),
          },
        },
      ],
    }).compile();

    resolver = module.get<AppInfoResolver>(AppInfoResolver);
    service = module.get<AppInfoService>(AppInfoService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('appInfo', () => {
    it('should return app info', () => {
      expect(resolver.appInfo()).toEqual(mockAppInfo);
      expect((service.appInfo as jest.Mock).mock.calls.length).toBeGreaterThan(
        0,
      );
    });
  });
});

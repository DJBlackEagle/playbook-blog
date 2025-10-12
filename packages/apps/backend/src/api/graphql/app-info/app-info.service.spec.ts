import { Test, TestingModule } from '@nestjs/testing';
import { APPINFO } from '../../../shared';
import { AppInfoService } from './app-info.service';

describe('AppInfoService', () => {
  let service: AppInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppInfoService],
    }).compile();

    service = module.get<AppInfoService>(AppInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('appInfo', () => {
    it('should return app info', () => {
      const result = service.appInfo();
      expect(result).toEqual({
        name: APPINFO.name,
        title: APPINFO.title,
        description: APPINFO.description,
        version: APPINFO.version,
      });
    });
  });
});

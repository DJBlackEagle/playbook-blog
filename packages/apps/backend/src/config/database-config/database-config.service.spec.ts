import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConfigService } from './database-config.service';

describe('DatabaseConfigService', () => {
  let service: DatabaseConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation((key: string, defaultValue?: string) => {
                if (key === 'DATABASE_URL') return 'mongodb://test-uri';
                return defaultValue;
              }),
          },
        },
      ],
    }).compile();
    service = module.get<DatabaseConfigService>(DatabaseConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMongooseOptions', () => {
    it('should return mongoose options with uri from config', () => {
      const options = service.createMongooseOptions();

      expect(options).toHaveProperty('uri', 'mongodb://test-uri');
    });

    it('should return default uri if config value is not set', () => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(
          (key: string, defaultValue?: string) => defaultValue,
        );
      const options = service.createMongooseOptions();

      expect(options).toHaveProperty(
        'uri',
        'mongodb://localhost:27017/playbook-blog',
      );
    });
  });
});

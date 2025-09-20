import { Test, TestingModule } from '@nestjs/testing';
import { SeederInput } from './inputs/seeder.input';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeederService],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('seedData', () => {
    it('should set startedAt, completedAt, and nodeEnv', async () => {
      const input: SeederInput = {} as SeederInput;
      const result = await service.seedData(input);

      expect(result.startedAt).toBeInstanceOf(Date);
      expect(result.completedAt).toBeInstanceOf(Date);
      expect(result.nodeEnv).toBe(process.env.NODE_ENV);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SeederInput } from './inputs/seeder.input';
import { Seeder } from './models/sedder.model';
import { SeederResolver } from './seeder.resolver';
import { SeederService } from './seeder.service';

describe('SeederResolver', () => {
  let resolver: SeederResolver;
  let seederService: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederResolver,
        {
          provide: SeederService,
          useValue: {
            seedData: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SeederResolver>(SeederResolver);
    seederService = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('seedData', () => {
    it('should call SeederService.seedData and return result', async () => {
      const input: SeederInput = {} as SeederInput;
      const result: Seeder = {} as Seeder;
      const spy = jest.spyOn(seederService, 'seedData');
      spy.mockResolvedValue(result);

      await expect(resolver.seedData(input)).resolves.toBe(result);
      expect(spy).toHaveBeenCalledWith(input);
    });
  });
});

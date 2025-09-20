import { Test, TestingModule } from '@nestjs/testing';
import { SeederInput } from './inputs/seeder.input';
import { SeederRole } from './seeder-role/seeder-role.model';
import { SeederRoleService } from './seeder-role/seeder-role.service';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;
  let seederRoleService: SeederRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        {
          provide: SeederRoleService,
          useValue: {
            seed: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
    seederRoleService = module.get<SeederRoleService>(SeederRoleService);
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

    it('should call seederRoleService.seed if seedRoles is true', async () => {
      const input: SeederInput = { seedRoles: true } as SeederInput;
      const roleResult: SeederRole = {
        startedAt: new Date(),
        completedAt: new Date(),
        success: true,
        roles: [],
      };
      const spy = jest
        .spyOn(seederRoleService, 'seed')
        .mockResolvedValue(roleResult);
      const result = await service.seedData(input);

      expect(spy).toHaveBeenCalled();
      expect(result.role).toBe(roleResult);
    });

    it('should not call seederRoleService.seed if seedRoles is false', async () => {
      const input: SeederInput = { seedRoles: false } as SeederInput;
      const spy = jest.spyOn(seederRoleService, 'seed');
      const result = await service.seedData(input);

      expect(spy).not.toHaveBeenCalled();
      expect(result.role).toBeUndefined();
    });
  });
});

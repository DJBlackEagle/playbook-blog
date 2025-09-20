import { Test, TestingModule } from '@nestjs/testing';
import { QueryService, getQueryServiceToken } from '@ptc-org/nestjs-query-core';
import { RoleEntity } from '../../roles/entities/role.entity';
import { SeederRoleService } from './seeder-role.service';

describe('SeederRoleService', () => {
  let service: SeederRoleService;
  let roleService: QueryService<RoleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederRoleService,
        {
          provide: getQueryServiceToken(RoleEntity),
          useValue: {
            deleteMany: jest.fn(),
            createMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SeederRoleService>(SeederRoleService);
    roleService = module.get<QueryService<RoleEntity>>(
      getQueryServiceToken(RoleEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed roles successfully', async () => {
      jest
        .spyOn(roleService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 5 });
      const mockRoleEntities = Array(5)
        .fill(null)
        .map(() => ({ toObject: () => ({}) })) as unknown as RoleEntity[];
      jest.spyOn(roleService, 'createMany').mockResolvedValue(mockRoleEntities);
      const result = await service.seed();

      expect(result.success).toBe(true);
      expect(result.roles).toHaveLength(5);
      expect(result.error).toBeUndefined();
      expect(result.startedAt).toBeInstanceOf(Date);
      expect(result.completedAt).toBeInstanceOf(Date);
    });

    it('should handle partial creation', async () => {
      jest
        .spyOn(roleService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 1 });
      const mockPartialRoleEntities = [
        { toObject: () => ({}) },
      ] as unknown as RoleEntity[];
      jest
        .spyOn(roleService, 'createMany')
        .mockResolvedValue(mockPartialRoleEntities);
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Expected to create 5 roles/);
    });

    it('should handle errors in createMany', async () => {
      jest
        .spyOn(roleService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 0 });
      jest
        .spyOn(roleService, 'createMany')
        .mockRejectedValue(new Error('fail'));
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/fail/);
    });

    it('should handle errors in createMany with no message', async () => {
      jest
        .spyOn(roleService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 0 });
      jest.spyOn(roleService, 'createMany').mockRejectedValue({});
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Unknown error/);
    });
  });
});

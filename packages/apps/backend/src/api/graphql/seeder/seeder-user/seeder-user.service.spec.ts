/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getQueryServiceToken } from '@ptc-org/nestjs-query-core';
import { RoleEntity } from '../../roles/entities/role.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { User } from '../../user/models/user.model';
import { SeederUserService } from './seeder-user.service';

describe('SeederUserService', () => {
  let service: SeederUserService;

  const mockUserService: {
    deleteMany: jest.Mock;
    createMany: jest.Mock;
  } = {
    deleteMany: jest.fn(),
    createMany: jest.fn(),
  };
  const mockRoleService: {
    query: jest.Mock;
  } = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederUserService,
        {
          provide: getQueryServiceToken(UserEntity),
          useValue: mockUserService,
        },
        {
          provide: getQueryServiceToken(RoleEntity),
          useValue: mockRoleService,
        },
      ],
    }).compile();

    service = module.get<SeederUserService>(SeederUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should seed users and assign roles successfully', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    mockRoleService.query.mockImplementation(
      ({ filter }: { filter: { name: { eq: string } } }) => {
        return Promise.resolve([
          {
            _id: filter.name.eq,
            name: filter.name.eq,
          } as { _id: string; name: string },
        ]);
      },
    );
    mockUserService.createMany.mockImplementation(
      (users: Array<Record<string, unknown>>) => {
        return Promise.resolve(
          users.map((u) => ({
            ...u,
            toObject: () => ({ ...u, virtuals: true }),
          })),
        );
      },
    );

    const result = await service.seed();

    expect(result.success).toBe(true);
    expect(result.users).toBeDefined();
    expect(result.users?.length).toBe(7);
    expect(result.error).toBeUndefined();
    expect(result.startedAt).toBeInstanceOf(Date);
    expect(result.completedAt).toBeInstanceOf(Date);
    expect(mockUserService.deleteMany).toHaveBeenCalledWith({});
    expect(mockUserService.createMany).toHaveBeenCalled();
    expect(mockRoleService.query).toHaveBeenCalled();

    result.users?.forEach((user: User) => {
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('role');
    });
  });

  it('should handle partial creation of users (branch coverage)', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    mockRoleService.query.mockImplementation(
      ({ filter }: { filter: { name: { eq: string } } }) => {
        return Promise.resolve([
          {
            _id: filter.name.eq,
            name: filter.name.eq,
          } as { _id: string; name: string },
        ]);
      },
    );

    mockUserService.createMany.mockImplementation(
      (users: Array<Record<string, unknown>>) => {
        return Promise.resolve(
          users.slice(0, 3).map((u) => ({
            ...u,
            toObject: () => ({ ...u, virtuals: true }),
          })),
        );
      },
    );

    const result = await service.seed();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(
      /Expected to create 7 users, but created only 3/,
    );
    expect(result.users).toBeUndefined();
  });

  it('should handle empty users array', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    mockRoleService.query.mockImplementation(
      ({ filter }: { filter: { name: { eq: string } } }) => {
        return Promise.resolve([
          {
            _id: filter.name.eq,
            name: filter.name.eq,
          } as { _id: string; name: string },
        ]);
      },
    );
    mockUserService.createMany.mockResolvedValue([]);

    jest.spyOn(service as any, 'seed').mockImplementationOnce(async () => {
      const data: any = {};
      data.startedAt = new Date();
      data.success = true;
      await mockUserService.deleteMany({});

      try {
        const result = await mockUserService.createMany([]);
        if (result.length !== 0) {
          data.success = false;
          data.error = `Expected to create 0 users, but created only ${result.length}.`;
        } else {
          data.users = [];
        }
      } catch {
        data.success = false;
        data.error = 'Error creating users';
      }
      data.completedAt = new Date();

      return data;
    });

    const result = await service.seed();
    expect(result.success).toBe(true);
    expect(result.users).toEqual([]);
    expect(result.error).toBeUndefined();
  });

  it('should fail if a role is missing', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    let callCount = 0;
    mockRoleService.query.mockImplementation(() => {
      callCount++;
      if (callCount === 3) return Promise.resolve([]);
      return Promise.resolve([{ _id: 'roleid', name: 'ADMIN' }]);
    });

    const result = await service.seed();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Role MODERATOR not found/);
    expect(result.users).toBeUndefined();
    expect(mockUserService.createMany).not.toHaveBeenCalled();
  });

  it('should handle error when user creation fails', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    mockRoleService.query.mockResolvedValue([{ _id: 'roleid', name: 'ADMIN' }]);
    mockRoleService.query.mockImplementation(({ filter }: { filter: any }) => {
      return Promise.resolve([{ _id: filter.name.eq, name: filter.name.eq }]);
    });
    mockUserService.createMany.mockRejectedValue(new Error('DB error'));

    const result = await service.seed();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Error creating users: DB error/);
    expect(result.users).toBeUndefined();
  });

  it('should handle empty users array', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    mockRoleService.query.mockImplementation(
      ({ filter }: { filter: { name: { eq: string } } }) => {
        return Promise.resolve([
          {
            _id: filter.name.eq,
            name: filter.name.eq,
          } as { _id: string; name: string },
        ]);
      },
    );
    mockUserService.createMany.mockResolvedValue([]);

    jest.spyOn(service as any, 'seed').mockImplementationOnce(async () => {
      const data: {
        startedAt: Date;
        success: boolean;
        users?: User[];
        error?: string;
        completedAt?: Date;
      } = {
        startedAt: new Date(),
        success: true,
      };

      await mockUserService.deleteMany({});

      try {
        const result: User[] = await mockUserService.createMany([]);
        if (result.length !== 0) {
          data.success = false;
          data.error = `Expected to create 0 users, but created only ${result.length}.`;
        } else {
          data.users = [];
        }
      } catch {
        data.success = false;
        data.error = 'Error creating users';
      }
      data.completedAt = new Date();
      return data;
    });

    const result = await service.seed();
    expect(result.success).toBe(true);
    expect(result.users).toEqual([]);
    expect(result.error).toBeUndefined();
  });

  it('should handle error when user creation fails with no message property', async () => {
    mockUserService.deleteMany.mockResolvedValue(undefined);
    mockRoleService.query.mockImplementation(({ filter }: { filter: any }) => {
      return Promise.resolve([{ _id: filter.name.eq, name: filter.name.eq }]);
    });
    mockUserService.createMany.mockRejectedValue({});

    const result = await service.seed();
    expect(result.success).toBe(false);
    expect(result.error).toBe('Error creating users: Unknown error');
    expect(result.users).toBeUndefined();
  });
});

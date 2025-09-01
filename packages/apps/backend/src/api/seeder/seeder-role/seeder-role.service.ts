import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { plainToClass } from 'class-transformer';
import { RoleEntity } from '../../role/entities/role.entity';
import { Role } from '../../role/models/role.model';
import { SeederRole } from './seeder-role.model';

@Injectable()
export class SeederRoleService {
  constructor(
    @InjectQueryService(RoleEntity)
    private roleService: QueryService<RoleEntity>,
  ) {}

  async seed(): Promise<SeederRole> {
    const data: SeederRole = new SeederRole();
    data.startedAt = new Date();
    data.success = true;

    await this.roleService.deleteMany({});

    const roles = [
      {
        name: 'ADMIN',
        description:
          'Administrator with full system access. Manages users, roles, and all content.',
        isSystemRole: true,
      },
      {
        name: 'MODERATOR',
        description:
          'Content moderator. Can read all posts, update/delete any comments, and manage user reports.',
        isSystemRole: true,
      },
      {
        name: 'EDITOR',
        description:
          'Content editor. Can create, read, update, delete own posts/comments, and read all content.',
        isSystemRole: true,
      },
      {
        name: 'USER',
        description:
          'Standard blog user. Can read all posts and create own comments.',
        isSystemRole: false,
      },
      {
        name: 'MINIMODERATOR',
        description:
          'Mini moderator. Can read all posts, update/delete own comments, and manage user reports.',
        isSystemRole: false,
      },
    ] as RoleEntity[];

    try {
      const result = await this.roleService.createMany(roles);
      if (result.length !== roles.length) {
        console.error(
          `Expected to create ${roles.length} roles, but created only ${result.length}.`,
        );

        data.success = false;
        data.error = `Expected to create ${roles.length} roles, but created only ${result.length}.`;
      } else {
        data.roles = result.map((role) =>
          plainToClass(Role, role.toObject({ virtuals: true })),
        );
      }
    } catch (error) {
      const { message } = error as Error;
      console.error('Error creating roles:', error);
      data.success = false;
      data.error = `Error creating roles: ${message || 'Unknown error'}`;
    }

    data.completedAt = new Date();

    return data;
  }
}

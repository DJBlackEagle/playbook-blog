import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { plainToClass } from 'class-transformer';
import { RoleEntity } from '../../role/entities/role.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { User } from '../../user/models/user.model';
import { SeederUser } from './seeder-role.model';

@Injectable()
export class SeederUserService {
  constructor(
    @InjectQueryService(UserEntity)
    private userService: QueryService<UserEntity>,
    @InjectQueryService(RoleEntity)
    private roleService: QueryService<RoleEntity>,
  ) {}

  async seed(): Promise<SeederUser> {
    const data: SeederUser = new SeederUser();
    data.startedAt = new Date();
    data.success = true;

    await this.userService.deleteMany({});

    const users = [
      {
        username: 'admin1',
        email: 'admin1@example.local',
        password: 'admin123',
        role: 'ADMIN',
      },
      {
        username: 'admin2',
        email: 'admin2@example.local',
        password: 'admin123',
        role: 'ADMIN',
      },
      {
        username: 'moderator',
        email: 'moderator@example.local',
        password: 'moderator123',
        role: 'MODERATOR',
      },
      {
        username: 'editor1',
        email: 'editor1@example.local',
        password: 'editor123',
        role: 'EDITOR',
      },
      {
        username: 'editor2',
        email: 'editor2@example.local',
        password: 'editor123',
        role: 'EDITOR',
      },
      {
        username: 'editor3',
        email: 'editor3@example.local',
        password: 'editor123',
        role: 'EDITOR',
      },
      {
        username: 'user',
        email: 'user@example.local',
        password: 'user123',
        role: 'USER',
      },
    ];

    for (let index = 0; index < users.length; index++) {
      const user = users[index];

      const role = await this.roleService.query({
        filter: { name: { eq: user.role } },
      });

      if (!role || role.length === 0) {
        console.error(`Role ${user.role} not found for user ${user.username}`);
        data.success = false;
        data.error = `Role ${user.role} not found for user ${user.username}`;
        return data;
      }

      users[index].role = role[0]._id as string;
    }

    try {
      const result = await this.userService.createMany(users);
      if (result.length !== users.length) {
        console.error(
          `Expected to create ${users.length} users, but created only ${result.length}.`,
        );

        data.success = false;
        data.error = `Expected to create ${users.length} users, but created only ${result.length}.`;
      } else {
        data.users = result.map((user) =>
          plainToClass(User, user.toObject({ virtuals: true })),
        );
      }
    } catch (error) {
      const { message } = error as Error;
      console.error('Error creating users:', error);
      data.success = false;
      data.error = `Error creating users: ${message || 'Unknown error'}`;
    }

    data.completedAt = new Date();

    return data;
  }
}

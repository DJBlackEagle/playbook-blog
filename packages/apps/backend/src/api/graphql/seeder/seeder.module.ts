import { Module } from '@nestjs/common';
import { RoleModule } from '../roles/role.module';
import { UserModule } from '../user/user.module';
import { SeederRoleService } from './seeder-role/seeder-role.service';
import { SeederUserService } from './seeder-user/seeder-user.service';
import { SeederResolver } from './seeder.resolver';
import { SeederService } from './seeder.service';

/**
 * SeederModule provides GraphQL seeding functionality.
 *
 * This module wires up the SeederService and SeederResolver for seeding operations.
 */
@Module({
  imports: [RoleModule, UserModule],
  providers: [
    SeederService,
    SeederResolver,
    SeederRoleService,
    SeederUserService,
  ],
})
export class SeederModule {}

import { Module } from '@nestjs/common';
import { RoleModule } from '../roles/role.module';
import { SeederRoleService } from './seeder-role/seeder-role.service';
import { SeederResolver } from './seeder.resolver';
import { SeederService } from './seeder.service';

/**
 * SeederModule provides GraphQL seeding functionality.
 *
 * This module wires up the SeederService and SeederResolver for seeding operations.
 */
@Module({
  imports: [RoleModule],
  providers: [SeederService, SeederResolver, SeederRoleService],
})
export class SeederModule {}

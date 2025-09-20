import { Module } from '@nestjs/common';
import { SeederResolver } from './seeder.resolver';
import { SeederService } from './seeder.service';

/**
 * SeederModule provides GraphQL seeding functionality.
 *
 * This module wires up the SeederService and SeederResolver for seeding operations.
 */
@Module({
  providers: [SeederService, SeederResolver],
})
export class SeederModule {}

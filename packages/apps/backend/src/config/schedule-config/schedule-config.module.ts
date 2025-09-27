import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

/**
 * NestJS module for configuring and providing GraphQL integration.
 *
 * Sets up Apollo GraphQL with async configuration using GraphQLConfigService.
 */
@Module({
  imports: [ScheduleModule.forRoot()],
})
export class ScheduleConfigModule {}

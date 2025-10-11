import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

/**
 * NestJS module for configuring and providing scheduling functionality.
 *
 * Sets up the ScheduleModule to enable scheduled tasks within the application.
 */
@Module({
  imports: [ScheduleModule.forRoot()],
})
export class ScheduleConfigModule {}

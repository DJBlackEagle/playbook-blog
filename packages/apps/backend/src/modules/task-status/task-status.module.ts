import { Module } from '@nestjs/common';
import { TaskStatusService } from './task-status.service';

/**
 * NestJS module that provides the TaskStatusService for managing task statuses.
 *
 * @example
 * // Import and use in another module:
 * // import { TaskStatusModule } from './task-status.module';
 */
@Module({
  providers: [TaskStatusService],
  exports: [TaskStatusService],
})
export class TaskStatusModule {}

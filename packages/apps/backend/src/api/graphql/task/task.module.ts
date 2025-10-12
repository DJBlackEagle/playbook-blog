import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { TaskResult } from '../../../modules/task-status/enums/task-result';
import { TaskState } from '../../../modules/task-status/enums/task-state.enum';
import { TaskStatusModule } from '../../../modules/task-status/task-status.module';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

registerEnumType(TaskState, { name: 'TaskState' });
registerEnumType(TaskResult, { name: 'TaskResult' });

/**
 * NestJS module for scheduled task GraphQL API.
 *
 * @remarks
 * Registers the resolver and service for exposing scheduled task information via GraphQL.
 */
@Module({
  imports: [TaskStatusModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}

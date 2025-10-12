import { Injectable } from '@nestjs/common';
import { TaskStatusService } from '../../../modules/task-status/task-status.service';
import { TaskInfo } from './models/task-info.model';

/**
 * Service for managing and retrieving scheduled task information via GraphQL.
 *
 * @remarks
 * This service acts as a bridge between the GraphQL API and the TaskStatusService,
 * providing task status and scheduling details to API consumers.
 */
@Injectable()
export class TaskService {
  /**
   * Creates a new TaskService.
   *
   * @param taskStatusService - The service for managing scheduled task status.
   */
  constructor(private readonly taskStatusService: TaskStatusService) {}

  getTasks(): TaskInfo[] {
    const jobs = this.taskStatusService.getAllTasks();
    const taskInfos: TaskInfo[] = [];

    jobs.forEach((job) => {
      if (job) {
        taskInfos.push({
          name: job.name,
          state: job.state,
          lastDate: job.lastDate || undefined,
          lastResult: job.lastResult,
          nextDate: job.nextDate,
        });
      }
    });

    return taskInfos;
  }
}

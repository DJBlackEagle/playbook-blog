import { Query, Resolver } from '@nestjs/graphql';
import { TaskInfo } from './models/task-info.model';
import { TaskService } from './task.service';

/**
 * GraphQL resolver for scheduled task queries.
 *
 * @remarks
 * Provides API endpoints for retrieving available scheduled jobs and their status.
 */
@Resolver()
export class TaskResolver {
  /**
   * Creates a new TaskResolver.
   *
   * @param taskService - The service for retrieving scheduled task information.
   */
  constructor(private readonly taskService: TaskService) {}

  /**
   * GraphQL query to retrieve all scheduled tasks and their status.
   *
   * @returns An array of TaskInfo objects representing each scheduled task.
   *
   * @example
   * // GraphQL query
   * query {
   *   tasks {
   *     name
   *     state
   *     lastDate
   *     lastResult
   *     nextDate
   *   }
   * }
   */
  @Query(() => [TaskInfo], {
    name: 'tasks',
    description: 'Get a list of all scheduled tasks',
  })
  getTasks(): TaskInfo[] {
    return this.taskService.getTasks();
  }
}

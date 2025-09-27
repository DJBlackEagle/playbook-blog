import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TaskResult } from './enums/task-result';
import { TaskState } from './enums/task-state.enum';
import { ITaskInfo } from './interfaces/task-info.interface';

/**
 * Represents the state and result of a scheduled task.
 *
 * @property state - The current state of the task.
 * @property result - The result of the task execution.
 */
interface ITaskState {
  state: TaskState;
  result: TaskResult;
}

/**
 * Service for managing and tracking the status of scheduled tasks.
 *
 * @remarks
 * Handles initialization, state/result updates, and retrieval of task status information.
 */
@Injectable()
export class TaskStatusService {
  private readonly logger: Logger = new Logger(TaskStatusService.name);
  private tasks: Map<string, ITaskState> = new Map();

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  /**
   * Initializes a task with default state and result if it does not exist.
   *
   * @param jobName - The name of the job to initialize.
   */
  initializeTask(jobName: string) {
    if (!this.tasks.has(jobName)) {
      this.tasks.set(jobName, {
        state: TaskState.UNKNOWN,
        result: TaskResult.UNKNOWN,
      });
    }
  }

  /**
   * Sets the state of a specific task.
   *
   * @param jobName - The name of the job.
   * @param state - The new state to set.
   */
  setState(jobName: string, state: TaskState): void {
    if (!this.tasks.has(jobName)) {
      this.initializeTask(jobName);
    }

    const task = this.tasks.get(jobName);
    if (task) {
      task.state = state;
    }
  }

  /**
   * Sets the result of a specific task.
   *
   * @param jobName - The name of the job.
   * @param result - The result to set.
   */
  setResult(jobName: string, result: TaskResult): void {
    if (!this.tasks.has(jobName)) {
      this.initializeTask(jobName);
    }

    const task = this.tasks.get(jobName);
    if (task) {
      task.result = result;
    }
  }

  /**
   * Retrieves information about a specific task.
   *
   * @param jobName - The name of the job.
   * @returns The task information or undefined if not found.
   */
  getTask(jobName: string): ITaskInfo | undefined {
    const taskState = this.tasks.get(jobName);

    const conJob = this.schedulerRegistry.getCronJob(jobName);
    if (!conJob) {
      this.logger.warn(
        `Cron job with name ${jobName} not found in scheduler registry.`,
      );
      return undefined;
    }

    const task: ITaskInfo = {
      name: jobName,
      state: taskState?.state || TaskState.UNKNOWN,
      lastDate: conJob.lastDate(),
      lastResult: taskState?.result || TaskResult.UNKNOWN,
      nextDate: new Date(conJob.nextDate().toJSDate()),
    };

    return task;
  }

  /**
   * Retrieves information about all scheduled tasks.
   *
   * @returns An array of task information objects.
   */
  getAllTasks(): ITaskInfo[] {
    const tasks: ITaskInfo[] = [];

    this.schedulerRegistry.getCronJobs().forEach((item) => {
      if (item.name) {
        const task = this.getTask(item.name);
        if (task) tasks.push(task);
      } else {
        const task: ITaskInfo = {
          name: 'unknown',
          state: TaskState.UNKNOWN,
          lastDate: item.lastDate(),
          lastResult: TaskResult.UNKNOWN,
          nextDate: new Date(item.nextDate().toJSDate()),
        } as ITaskInfo;

        tasks.push(task);
      }
    });

    return tasks;
  }
}

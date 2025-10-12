import { TaskResult } from '../enums/task-result';
import { TaskState } from '../enums/task-state.enum';

/**
 * Represents information about a scheduled task.
 *
 * @property name - The name of the scheduled task.
 * @property state - The current state of the task.
 * @property lastDate - The date when the task was last executed, or null if never executed.
 * @property lastResult - The result of the last execution of the task.
 * @property nextDate - The date when the task is scheduled to run next.
 *
 * @example
 * ```typescript
 * const info: ITaskInfo = {
 *   name: 'dailyJob',
 *   state: TaskState.RUNNING,
 *   lastDate: new Date(),
 *   lastResult: TaskResult.SUCCESS,
 *   nextDate: new Date(),
 * };
 * ```
 */
export interface ITaskInfo {
  /**
   * The name of the scheduled task.
   * Used to identify the task in the scheduler.
   */
  name: string;

  /**
   * The current state of the task.
   * Indicates whether the task is running, idle, or unknown.
   */
  state: TaskState;

  /**
   * The date when the task was last executed.
   * Null if the task has never been executed.
   */
  lastDate: Date | null;

  /**
   * The result of the last execution of the task.
   * Can be success, failed, pending, or unknown.
   */
  lastResult: TaskResult;

  /**
   * The date when the task is scheduled to run next.
   * Used for scheduling and monitoring purposes.
   */
  nextDate: Date;
}

/**
 * Represents possible states of a scheduled task.
 *
 * @example
 * ```typescript
 * const state: TaskState = TaskState.RUNNING;
 * ```
 */
export enum TaskState {
  /**
   * The task is idle and not currently running.
   * @example
   * TaskState.IDLE
   */
  IDLE = 'IDLE',
  /**
   * The task is currently running.
   * @example
   * TaskState.RUNNING
   */
  RUNNING = 'RUNNING',
  /**
   * The state of the task is unknown.
   * @example
   * TaskState.UNKNOWN
   */
  UNKNOWN = 'UNKNOWN',
}

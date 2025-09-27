/**
 * Represents possible results of a scheduled task.
 *
 * @example
 * ```typescript
 * const result: TaskResult = TaskResult.SUCCESS;
 * ```
 */
export enum TaskResult {
  /**
   * The task completed successfully.
   * @example
   * TaskResult.SUCCESS
   */
  SUCCESS = 'SUCCESS',
  /**
   * The task failed to complete.
   * @example
   * TaskResult.FAILED
   */
  FAILED = 'FAILED',
  /**
   * The task is still pending.
   * @example
   * TaskResult.PENDING
   */
  PENDING = 'PENDING',
  /**
   * The result of the task is unknown.
   * @example
   * TaskResult.UNKNOWN
   */
  UNKNOWN = 'UNKNOWN',
}

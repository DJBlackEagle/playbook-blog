import { Field, ObjectType } from '@nestjs/graphql';
import { TaskResult } from '../../../../modules/task-status/enums/task-result';
import { TaskState } from '../../../../modules/task-status/enums/task-state.enum';

/**
 * GraphQL object type representing information about a scheduled task.
 *
 * @property name - The name of the task.
 * @property state - The current state of the task.
 * @property lastDate - The last execution time of the task (optional).
 * @property lastResult - The result of the last execution (optional).
 * @property nextDate - The next scheduled execution time of the task.
 */
@ObjectType({})
export class TaskInfo {
  /**
   * The name of the task.
   */
  @Field(() => String, { description: 'The name of the task' })
  name: string;

  /**
   * The current state of the task.
   */
  @Field(() => TaskState, { description: 'The current state of the task' })
  state: TaskState;

  /**
   * The last execution time of the task (optional).
   */
  @Field(() => Date, {
    nullable: true,
    description: 'The last execution time of the task',
  })
  lastDate?: Date;

  /**
   * The result of the last execution (optional).
   */
  @Field(() => TaskResult, {
    nullable: true,
    description: 'The result of the last execution',
  })
  lastResult?: TaskResult;

  /**
   * The next scheduled execution time of the task.
   */
  @Field(() => Date, {
    description: 'The next scheduled execution time of the task',
  })
  nextDate: Date;
}

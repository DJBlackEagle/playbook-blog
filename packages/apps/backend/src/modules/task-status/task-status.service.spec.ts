/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TaskResult } from './enums/task-result';
import { TaskState } from './enums/task-state.enum';
import { TaskStatusService } from './task-status.service';

// Mocks
class MockCronJob {
  constructor(public name: string) {}
  lastDate() {
    return new Date('2023-01-01T00:00:00Z');
  }
  nextDate() {
    return { toJSDate: () => new Date('2023-01-02T00:00:00Z') };
  }
}

describe('TaskStatusService', () => {
  let service: TaskStatusService;
  let schedulerRegistry: SchedulerRegistry;

  beforeAll(() => {
    jest.spyOn(Logger.prototype, 'verbose').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});
  });

  beforeEach(() => {
    schedulerRegistry = {
      getCronJob: jest.fn((name: string) => new MockCronJob(name)),
      getCronJobs: jest.fn(
        () =>
          new Map([
            ['job1', new MockCronJob('job1')],
            ['job2', new MockCronJob('job2')],
          ]),
      ),
    } as any;
    service = new TaskStatusService(schedulerRegistry);
  });

  it('should initialize a task', () => {
    service.initializeTask('job1');
    const all = service.getAllTasks();
    expect(all.some((t) => t.name === 'job1')).toBe(true);
  });

  it('should not re-initialize a task if it already exists (else branch)', () => {
    service.initializeTask('job1');
    // Call again, should not overwrite
    service.initializeTask('job1');
    const all = service.getAllTasks();
    expect(all.filter((t) => t.name === 'job1').length).toBe(1);
  });

  it('should set state for a task', () => {
    service.setState('job1', TaskState.RUNNING);
    const all = service.getAllTasks();
    expect(all.find((t) => t.name === 'job1')?.state).toBe(TaskState.RUNNING);
  });

  it('should set state for a non-existent task (triggers initializeTask and if branch)', () => {
    service.setState('newJob', TaskState.IDLE);
    const info = service.getTask('newJob');
    expect(info?.state).toBe(TaskState.IDLE);
  });

  it('should set result for a task', () => {
    service.setResult('job1', TaskResult.SUCCESS);
    const all = service.getAllTasks();
    expect(all.find((t) => t.name === 'job1')?.lastResult).toBe(
      TaskResult.SUCCESS,
    );
  });

  it('should set result for a non-existent task (triggers initializeTask and if branch)', () => {
    service.setResult('newJob2', TaskResult.FAILED);
    const info = service.getTask('newJob2');
    expect(info?.lastResult).toBe(TaskResult.FAILED);
  });

  it('should get task info', () => {
    service.setState('job1', TaskState.RUNNING);
    service.setResult('job1', TaskResult.SUCCESS);
    const info = service.getTask('job1');
    expect(info).toBeDefined();
    expect(info?.name).toBe('job1');
    expect(info?.state).toBe(TaskState.RUNNING);
    expect(info?.lastResult).toBe(TaskResult.SUCCESS);
    expect(info?.lastDate).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(info?.nextDate).toEqual(new Date('2023-01-02T00:00:00Z'));
  });

  it('should return undefined if cron job not found', () => {
    (schedulerRegistry.getCronJob as jest.Mock).mockReturnValueOnce(undefined);
    const info = service.getTask('unknownJob');
    expect(info).toBeUndefined();
  });

  it('should get all tasks', () => {
    service.setState('job1', TaskState.RUNNING);
    service.setResult('job1', TaskResult.SUCCESS);
    service.setState('job2', TaskState.IDLE);
    service.setResult('job2', TaskResult.FAILED);
    const all = service.getAllTasks();
    expect(all.length).toBe(2);
    expect(all[0].name).toBe('job1');
    expect(all[1].name).toBe('job2');
  });

  it('should fallback to UNKNOWN state and result if taskState is undefined in getTask', () => {
    // Simulate undefined taskState by not setting state/result for job3
    (schedulerRegistry.getCronJob as jest.Mock).mockReturnValueOnce(
      new MockCronJob('job3'),
    );
    const info = service.getTask('job3');
    expect(info?.state).toBe(TaskState.UNKNOWN);
    expect(info?.lastResult).toBe(TaskResult.UNKNOWN);
  });

  it('should handle cron jobs without a name in getAllTasks', () => {
    // Mock getCronJobs to return an item without a name
    const namelessJob = {
      lastDate: () => new Date('2023-01-01T00:00:00Z'),
      nextDate: () => ({ toJSDate: () => new Date('2023-01-02T00:00:00Z') }),
    };
    (schedulerRegistry.getCronJobs as jest.Mock).mockReturnValueOnce([
      namelessJob,
    ]);
    const all = service.getAllTasks();
    expect(all.length).toBe(1);
    expect(all[0].name).toBe('unknown');
    expect(all[0].state).toBe(TaskState.UNKNOWN);
    expect(all[0].lastResult).toBe(TaskResult.UNKNOWN);
  });
});

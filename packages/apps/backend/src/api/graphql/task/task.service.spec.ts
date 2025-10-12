import { Test, TestingModule } from '@nestjs/testing';
import { TaskResult } from '../../../modules/task-status/enums/task-result';
import { TaskState } from '../../../modules/task-status/enums/task-state.enum';
import { TaskStatusService } from '../../../modules/task-status/task-status.service';
import { TaskInfo } from './models/task-info.model';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let statusService: TaskStatusService;

  const mockJobs: TaskInfo[] = [
    {
      name: 'job1',
      state: TaskState.RUNNING,
      lastDate: new Date('2025-09-27T10:00:00Z'),
      lastResult: TaskResult.SUCCESS,
      nextDate: new Date('2025-09-28T10:00:00Z'),
    },
    {
      name: 'job2',
      state: TaskState.UNKNOWN,
      lastDate: new Date('2025-09-27T11:00:00Z'),
      lastResult: TaskResult.FAILED,
      nextDate: new Date('2025-09-28T11:00:00Z'),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskStatusService,
          useValue: {
            getAllTasks: jest.fn().mockReturnValue(mockJobs),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    statusService = module.get<TaskStatusService>(TaskStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all scheduled tasks', () => {
    const result = service.getTasks();
    expect(result).toEqual(mockJobs);
    expect(
      (statusService.getAllTasks as jest.Mock).mock.calls.length,
    ).toBeGreaterThan(0);
  });

  it('should return an empty array if no jobs are available', () => {
    (statusService.getAllTasks as jest.Mock).mockReturnValue([]);
    const result = service.getTasks();
    expect(result).toEqual([]);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TaskResult } from '../../../modules/task-status/enums/task-result';
import { TaskState } from '../../../modules/task-status/enums/task-state.enum';
import { TaskInfo } from './models/task-info.model';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let service: TaskService;

  const mockTaskInfos: TaskInfo[] = [
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
        TaskResolver,
        {
          provide: TaskService,
          useValue: {
            getTasks: jest.fn().mockReturnValue(mockTaskInfos),
          },
        },
      ],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return scheduled tasks from the service', () => {
    const result = resolver.getTasks();
    expect(result).toEqual(mockTaskInfos);
    expect((service.getTasks as jest.Mock).mock.calls.length).toBeGreaterThan(
      0,
    );
  });

  it('should return an empty array if no tasks are scheduled', () => {
    jest.spyOn(service, 'getTasks').mockReturnValue([]);
    const result = resolver.getTasks();
    expect(result).toEqual([]);
  });
});

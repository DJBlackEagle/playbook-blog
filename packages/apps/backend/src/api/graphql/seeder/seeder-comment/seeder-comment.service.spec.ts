import { Test, TestingModule } from '@nestjs/testing';
import { QueryService, getQueryServiceToken } from '@ptc-org/nestjs-query-core';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { SeederCommentService } from './seeder-comment.service';

describe('SeederCommentService', () => {
  let service: SeederCommentService;
  let commentService: QueryService<CommentEntity>;

  beforeEach(async () => {
    class PostEntity {}
    const mockPostQueryService = {
      query: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederCommentService,
        {
          provide: getQueryServiceToken(CommentEntity),
          useValue: {
            deleteMany: jest.fn(),
            createMany: jest.fn(),
          },
        },
        {
          provide: getQueryServiceToken(PostEntity),
          useValue: mockPostQueryService,
        },
      ],
    }).compile();

    service = module.get<SeederCommentService>(SeederCommentService);
    commentService = module.get<QueryService<CommentEntity>>(
      getQueryServiceToken(CommentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should handle missing post for a comment', async () => {
      jest
        .spyOn(commentService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 4 });
      // @ts-expect-error: Accessing private postService for mocking in tests
      jest.spyOn(service.postService, 'query').mockResolvedValue([]);
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(
        /Post The Rise of AI in Modern Software Development not found/,
      );
      expect(result.comments).toBeUndefined();
      expect(result.startedAt).toBeInstanceOf(Date);
      expect(result.completedAt).toBeUndefined();
    });
    it('should seed comments successfully', async () => {
      jest
        .spyOn(commentService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 4 });
      const mockCommentEntities = Array(4)
        .fill(null)
        .map(() => ({ toObject: () => ({}) })) as unknown as CommentEntity[];
      jest
        .spyOn(commentService, 'createMany')
        .mockResolvedValue(mockCommentEntities);
      // @ts-expect-error: Accessing private postService for mocking in tests
      jest.spyOn(service.postService, 'query').mockResolvedValue([{}]);
      const result = await service.seed();

      expect(result.success).toBe(true);
      expect(result.comments).toHaveLength(4);
      expect(result.error).toBeUndefined();
      expect(result.startedAt).toBeInstanceOf(Date);
      expect(result.completedAt).toBeInstanceOf(Date);
    });

    it('should handle partial creation', async () => {
      jest
        .spyOn(commentService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 1 });
      const mockPartialCommentEntities = [
        { toObject: () => ({}) },
      ] as unknown as CommentEntity[];
      jest
        .spyOn(commentService, 'createMany')
        .mockResolvedValue(mockPartialCommentEntities);
      // @ts-expect-error: Accessing private postService for mocking in tests
      jest.spyOn(service.postService, 'query').mockResolvedValue([{}]);
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Expected to create 4 comments/);
    });

    it('should handle errors in createMany', async () => {
      jest
        .spyOn(commentService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 0 });
      jest
        .spyOn(commentService, 'createMany')
        .mockRejectedValue(new Error('fail'));
      // @ts-expect-error: Accessing private postService for mocking in tests
      jest.spyOn(service.postService, 'query').mockResolvedValue([{}]);
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/fail/);
    });

    it('should handle errors in createMany with no message', async () => {
      jest
        .spyOn(commentService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 0 });
      jest.spyOn(commentService, 'createMany').mockRejectedValue({});
      // @ts-expect-error: Accessing private postService for mocking in tests
      jest.spyOn(service.postService, 'query').mockResolvedValue([{}]);
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Unknown error/);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { QueryService, getQueryServiceToken } from '@ptc-org/nestjs-query-core';
import { PostEntity } from '../../post/entities/post.entity';
import { SeederPostService } from './seeder-post.service';

describe('SeederPostService', () => {
  let service: SeederPostService;
  let postService: QueryService<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederPostService,
        {
          provide: getQueryServiceToken(PostEntity),
          useValue: {
            deleteMany: jest.fn(),
            createMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SeederPostService>(SeederPostService);
    postService = module.get<QueryService<PostEntity>>(
      getQueryServiceToken(PostEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('seed', () => {
    it('should seed posts successfully', async () => {
      jest
        .spyOn(postService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 14 });
      const mockPostEntities = Array(14)
        .fill(null)
        .map(() => ({ toObject: () => ({}) })) as unknown as PostEntity[];
      jest.spyOn(postService, 'createMany').mockResolvedValue(mockPostEntities);
      const result = await service.seed();

      expect(result.success).toBe(true);
      expect(result.posts).toHaveLength(14);
      expect(result.error).toBeUndefined();
      expect(result.startedAt).toBeInstanceOf(Date);
      expect(result.completedAt).toBeInstanceOf(Date);
    });

    it('should handle partial creation', async () => {
      jest
        .spyOn(postService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 1 });
      const mockPartialPostEntities = [
        { toObject: () => ({}) },
      ] as unknown as PostEntity[];
      jest
        .spyOn(postService, 'createMany')
        .mockResolvedValue(mockPartialPostEntities);
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Expected to create 14 posts/);
    });

    it('should handle errors in createMany', async () => {
      jest
        .spyOn(postService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 0 });
      jest
        .spyOn(postService, 'createMany')
        .mockRejectedValue(new Error('fail'));
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/fail/);
    });

    it('should handle errors in createMany with no message', async () => {
      jest
        .spyOn(postService, 'deleteMany')
        .mockResolvedValue({ deletedCount: 0 });
      jest.spyOn(postService, 'createMany').mockRejectedValue({});
      const result = await service.seed();

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/Unknown error/);
    });
  });
});

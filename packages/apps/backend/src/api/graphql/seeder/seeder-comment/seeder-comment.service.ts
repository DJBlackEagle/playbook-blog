import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { plainToClass } from 'class-transformer';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { Comment } from '../../comment/models/comment.model';
import { PostEntity } from '../../post/entities/post.entity';
import { SeederComment } from './seeder-comment.model';

/**
 * Service for seeding the database with example comments for posts.
 *
 * Handles deletion of existing comments and creation of new ones for demo or test purposes.
 */
@Injectable()
export class SeederCommentService {
  /**
   * Constructs the SeederCommentService.
   *
   * @param commentService - Query service for comment entities.
   * @param postService - Query service for post entities.
   */
  constructor(
    @InjectQueryService(CommentEntity)
    private commentService: QueryService<CommentEntity>,
    @InjectQueryService(PostEntity)
    private postService: QueryService<PostEntity>,
  ) {}

  /**
   * Seeds the database with example comments for specific posts.
   *
   * Deletes all existing comments, then creates new ones for demo posts.
   *
   * @returns {Promise<SeederComment>} The result of the seeding operation, including status and errors.
   */
  async seed(): Promise<SeederComment> {
    const data: SeederComment = new SeederComment();
    data.startedAt = new Date();
    data.success = true;

    await this.commentService.deleteMany({});

    const comments = [
      {
        post: 'The Rise of AI in Modern Software Development',
        content:
          "This is a fascinating article on AI! I agree, it's changing everything.",
      },
      {
        post: 'The Rise of AI in Modern Software Development',
        content:
          'Are there any specific AI tools you recommend for code generation?',
      },
      {
        post: "GraphQL vs. REST: A Developer's Dilemma",
        content:
          "Excellent comparison! I've been wrestling with this choice for my new project.",
      },
      {
        post: 'NestJS: Building Scalable and Maintainable Backends',
        content:
          'NestJS truly simplifies backend development. The modularity is a game-changer!',
      },
    ];

    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];

      const post = await this.postService.query({
        filter: { title: { eq: comment.post } },
      });

      if (!post || post.length === 0) {
        console.error(
          `Post ${comment.post} not found for comment ${comment.content}`,
        );
        data.success = false;
        data.error = `Post ${comment.post} not found for comment ${comment.content}`;
        return data;
      }

      comment.post = post[0]._id.toString();
    }

    try {
      const result = await this.commentService.createMany(comments);
      if (result.length !== comments.length) {
        console.error(
          `Expected to create ${comments.length} comments, but created only ${result.length}.`,
        );

        data.success = false;
        data.error = `Expected to create ${comments.length} comments, but created only ${result.length}.`;
      } else {
        data.comments = result.map((comment) =>
          plainToClass(Comment, comment.toObject({ virtuals: true })),
        );
      }
    } catch (error) {
      const { message } = error as Error;
      console.error('Error creating comments:', error);
      data.success = false;
      data.error = `Error creating comments: ${message || 'Unknown error'}`;
    }

    data.completedAt = new Date();

    return data;
  }
}

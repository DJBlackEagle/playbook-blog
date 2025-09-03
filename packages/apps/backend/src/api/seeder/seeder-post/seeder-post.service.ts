import { Injectable } from '@nestjs/common';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { plainToClass } from 'class-transformer';
import { PostEntity } from '../../post/entities/post.entity';
import { Post } from '../../post/models/post.model';
import { SeederPost } from './seeder-post.model';

@Injectable()
export class SeederPostService {
  constructor(
    @InjectQueryService(PostEntity)
    private postService: QueryService<PostEntity>,
  ) {}

  /**
   * Seeds posts data.
   * @returns Promise resolving to an array of seeded posts.
   */
  async seed(): Promise<SeederPost> {
    const data: SeederPost = new SeederPost();
    data.startedAt = new Date();
    data.success = true;

    await this.postService.deleteMany({});

    const postsToSeed = [
      {
        title: 'The Rise of AI in Modern Software Development',
        teaser:
          'Artificial intelligence is transforming how we build and deploy software. Get the lowdown on the new tools for automation, analysis, and optimization.',
        content:
          'Artificial intelligence is rapidly transforming how we build and deploy software, offering new tools for automation, analysis, and optimization.',
      },
      {
        title: "GraphQL vs. REST: A Developer's Dilemma",
        teaser:
          'Deciding between GraphQL and REST for your API can be tricky. This post breaks down the pros and cons of each to help you make the right choice for your project.',
        content:
          'Choosing between GraphQL and REST for your API can be challenging. This post explores the pros and cons of each approach.',
      },
      {
        title: 'NestJS: Building Scalable and Maintainable Backends',
        teaser:
          'Thinking about building your next backend application? NestJS offers a powerful and scalable architecture that can help you get the job done right.',
        content:
          'NestJS, a progressive Node.js framework, provides a robust architecture for developing efficient and scalable server-side applications.',
      },
    ];

    try {
      const result = await this.postService.createMany(postsToSeed);
      if (result.length !== postsToSeed.length) {
        console.error(
          `Expected to create ${postsToSeed.length} posts, but created only ${result.length}.`,
        );

        data.success = false;
        data.error = `Expected to create ${postsToSeed.length} posts, but created only ${result.length}.`;
      } else {
        data.posts = result.map((post) =>
          plainToClass(Post, post.toObject({ virtuals: true })),
        );
      }
    } catch (error) {
      const { message } = error as Error;
      console.error('Error creating posts:', error);
      data.success = false;
      data.error = `Error creating users: ${message || 'Unknown error'}`;
    }

    data.completedAt = new Date();

    return data;
  }
}

import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { PostEntity, PostEntityModel } from './entities/post.entity';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { Post } from './models/post.model';

const nestjsQueryMongooseModule = NestjsQueryMongooseModule.forFeature([
  {
    document: PostEntity,
    name: PostEntityModel.name,
    schema: PostEntityModel.schema,
  },
]);

/**
 * NestJS module for the Post feature.
 *
 * Integrates Mongoose and GraphQL for CRUD operations on posts using nestjs-query.
 * Provides soft delete, total count, and DTO mapping for Post entities.
 */
@Module({
  imports: [
    nestjsQueryMongooseModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [nestjsQueryMongooseModule],
      resolvers: [
        {
          DTOClass: Post,
          EntityClass: PostEntity,
          create: {
            CreateDTOClass: CreatePostInput,
          },
          update: {
            UpdateDTOClass: UpdatePostInput,
          },
          delete: {
            useSoftDelete: true,
          },
          enableTotalCount: true,
        },
      ],
    }),
  ],
  exports: [nestjsQueryMongooseModule],
})
export class PostModule {}

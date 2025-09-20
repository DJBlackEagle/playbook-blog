import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { CommentEntity, CommentEntityModel } from './entities/comment.entity';
import { CreateCommentInput } from './inputs/create-comment.input';
import { Comment } from './models/comment.model';

const nestjsQueryMongooseModule = NestjsQueryMongooseModule.forFeature([
  {
    document: CommentEntity,
    name: CommentEntityModel.name,
    schema: CommentEntityModel.schema,
  },
]);

/**
 * NestJS module for the Comment feature.
 *
 * Integrates Mongoose and GraphQL for CRUD operations on comments using nestjs-query.
 * Provides soft delete, total count, and DTO mapping for Comment entities.
 */
@Module({
  imports: [
    nestjsQueryMongooseModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [nestjsQueryMongooseModule],
      resolvers: [
        {
          DTOClass: Comment,
          EntityClass: CommentEntity,
          create: {
            CreateDTOClass: CreateCommentInput,
          },
          update: { disabled: true },
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
export class CommentModule {}

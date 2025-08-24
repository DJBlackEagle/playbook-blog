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

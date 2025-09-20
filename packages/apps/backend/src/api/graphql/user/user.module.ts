import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { EncryptionModule } from '../../../modules/encryption';
import { UserEntity, UserEntityModel } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

const nestjsQueryMongooseModule = NestjsQueryMongooseModule.forFeature([
  {
    document: UserEntity,
    name: UserEntityModel.name,
    schema: UserEntityModel.schema,
  },
]);

@Module({
  imports: [
    nestjsQueryMongooseModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [nestjsQueryMongooseModule, EncryptionModule],
      resolvers: [
        {
          DTOClass: User,
          EntityClass: UserEntity,
          Service: UserService,
          create: {
            CreateDTOClass: CreateUserInput,
          },
          update: {
            UpdateDTOClass: UpdateUserInput,
          },
          delete: {
            useSoftDelete: true,
          },
          enableTotalCount: true,
        },
      ],
    }),
  ],
  providers: [UserService],
  exports: [nestjsQueryMongooseModule, UserService],
})
export class UserModule {}

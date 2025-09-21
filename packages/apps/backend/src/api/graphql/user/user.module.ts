import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { GqlAuthGuard } from '../../../common/guards';
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

/**
 * NestJS module for user management and GraphQL integration.
 *
 * Registers the user entity, service, and GraphQL resolvers for CRUD operations.
 * Integrates with Mongoose and encryption modules for persistence and security.
 */
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
          guards: [GqlAuthGuard],
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

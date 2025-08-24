import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RoleEntity, RoleEntityModel } from './entities/role.entity';
import { CreateRoleInput } from './inputs/create-role.input';
import { UpdateRoleInput } from './inputs/update-role.input';
import { Role } from './models/role.model';

const nestjsQueryMongooseModule = NestjsQueryMongooseModule.forFeature([
  {
    document: RoleEntity,
    name: RoleEntityModel.name,
    schema: RoleEntityModel.schema,
  },
]);

@Module({
  imports: [
    nestjsQueryMongooseModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [nestjsQueryMongooseModule],
      resolvers: [
        {
          DTOClass: Role,
          EntityClass: RoleEntity,
          guards: [GqlAuthGuard],
          create: {
            CreateDTOClass: CreateRoleInput,
          },
          update: {
            UpdateDTOClass: UpdateRoleInput,
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
export class RoleModule {}

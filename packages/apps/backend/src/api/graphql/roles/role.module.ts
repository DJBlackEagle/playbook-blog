import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { RoleEntity, RoleEntityModel } from './entities/role.entity';
import { CreateRoleInput } from './inputs/create-role.input';
import { UpdateRoleInput } from './inputs/update-role.input';
import { Role } from './models/role.model';

/**
 * Mongoose module for the Role entity.
 * Provides schema and model configuration for Role documents.
 */
const nestjsQueryMongooseModule = NestjsQueryMongooseModule.forFeature([
  {
    document: RoleEntity,
    name: RoleEntityModel.name,
    schema: RoleEntityModel.schema,
  },
]);

/**
 * RoleModule
 *
 * This module provides GraphQL and Mongoose integration for the Role entity.
 * It configures CRUD resolvers, input types, and enables soft delete and total count features.
 */
@Module({
  imports: [
    nestjsQueryMongooseModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [nestjsQueryMongooseModule],
      resolvers: [
        {
          DTOClass: Role,
          EntityClass: RoleEntity,
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

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfigService } from './graphql-config.service';

/**
 * NestJS module for configuring and providing GraphQL integration.
 *
 * Sets up Apollo GraphQL with async configuration using GraphQLConfigService.
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [GraphQLConfigService],
      useClass: GraphQLConfigService,
    }),
  ],
  providers: [GraphQLConfigService],
})
export class GraphQLConfigModule {}

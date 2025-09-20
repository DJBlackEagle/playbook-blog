import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLConfigService } from './graphql-config.service';

/**
 * NestJS module for configuring and providing GraphQL integration.
 *
 * Sets up Apollo GraphQL with async configuration using GraphQLConfigService.
 */
@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [GraphQLConfigService],
      useClass: GraphQLConfigService,
    }),
  ],
  providers: [GraphQLConfigService],
})
export class GraphQLConfigModule {}

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { GraphQLConfigService } from './config';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/blog-db'),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
    }),
    ModulesModule,
    ApiModule,
  ],
})
export class AppModule {}

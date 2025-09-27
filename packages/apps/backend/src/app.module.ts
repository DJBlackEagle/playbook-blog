import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DatabaseConfigModule } from './config/database-config/database-config.module';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { GraphQLConfigModule } from './config/graphql-config/graphql-config.module';
import { ScheduleConfigModule } from './config/schedule-config/schedule-config.module';
import { TaskStatusModule } from './modules/task-status/task-status.module';

/**
 * The root module of the application.
 *
 * Imports configuration, database, GraphQL, and API modules to bootstrap the backend.
 */
@Module({
  imports: [
    EnvironmentConfigModule,
    DatabaseConfigModule,
    TaskStatusModule,
    ScheduleConfigModule,
    GraphQLConfigModule,
    ApiModule,
  ],
})
export class AppModule {}

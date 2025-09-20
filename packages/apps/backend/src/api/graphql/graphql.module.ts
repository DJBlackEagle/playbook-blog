import { Module } from '@nestjs/common';
import { AppInfoModule } from './app-info/app-info.module';
import { SeederModule } from './seeder/seeder.module';

/**
 * GraphqlModule
 *
 * API module for grouping GraphQL resolvers and related providers.
 * Add resolvers and feature modules to the imports array as needed.
 *
 * @example
 * // In ApiModule:
 * imports: [GraphqlModule]
 */
@Module({
  imports: [AppInfoModule, SeederModule],
})
export class GraphqlModule {}

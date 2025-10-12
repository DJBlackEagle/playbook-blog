import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';

/**
 * ApiModule
 *
 * Root API module for grouping API-related submodules (GraphQL, REST, etc.).
 * Add feature modules (e.g., GraphQL, REST) to the imports array as needed.
 *
 * @example
 * // In AppModule:
 * imports: [ApiModule]
 */
@Module({ imports: [GraphqlModule] })
export class ApiModule {}

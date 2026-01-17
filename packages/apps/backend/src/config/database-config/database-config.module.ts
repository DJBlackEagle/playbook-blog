import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { DatabaseConfigService } from './database-config.service';

/**
 * NestJS module for configuring and providing database connectivity.
 *
 * Integrates Mongoose with async configuration using DatabaseConfigService.
 * Exports the configured MongooseModule for use in other modules.
 */
@Module({
  imports: [
    EnvironmentConfigModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [DatabaseConfigService],
      useClass: DatabaseConfigService,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [MongooseModule],
})
export class DatabaseConfigModule {}

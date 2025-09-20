import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigService } from './database-config.service';

/**
 * NestJS module for configuring and providing database connectivity.
 *
 * Integrates Mongoose with async configuration using DatabaseConfigService.
 * Exports the configured MongooseModule for use in other modules.
 */
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfigService],
      useClass: DatabaseConfigService,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [MongooseModule],
})
export class DatabaseConfigModule {}

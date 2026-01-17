import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

/**
 * Service for providing Mongoose database configuration options.
 *
 * Implements MongooseOptionsFactory to supply async configuration for MongooseModule.
 */
@Injectable()
export class DatabaseConfigService implements MongooseOptionsFactory {
  /**
   * Injects the ConfigService for accessing environment variables.
   * @param configService The NestJS ConfigService instance.
   */
  constructor(private readonly configService: EnvironmentConfigService) {}

  /**
   * Creates and returns Mongoose connection options.
   *
   * @returns {MongooseModuleOptions} The options for MongooseModule.
   */
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.database.url(),
    };
  }
}

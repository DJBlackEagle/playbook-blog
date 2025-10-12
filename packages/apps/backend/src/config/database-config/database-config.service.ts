import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

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
  constructor(private readonly configService: ConfigService) {}

  /**
   * Creates and returns Mongoose connection options.
   *
   * @returns {MongooseModuleOptions} The options for MongooseModule.
   */
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>(
        'MONGODB_URI',
        'mongodb://localhost:27017/playbook-blog',
      ),
    };
  }
}

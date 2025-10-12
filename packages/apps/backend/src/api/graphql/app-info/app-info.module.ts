import { Module } from '@nestjs/common';
import { AppInfoResolver } from './app-info.resolver';
import { AppInfoService } from './app-info.service';

/**
 * The AppInfoModule is a placeholder module for the application's information-related features.
 *
 * This module can be extended to provide metadata, versioning, or other informational endpoints
 * for the backend GraphQL API.
 *
 * @module AppInfoModule
 */
@Module({
  providers: [AppInfoResolver, AppInfoService],
})
export class AppInfoModule {}

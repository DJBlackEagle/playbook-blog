import { Query, Resolver } from '@nestjs/graphql';
import { AppInfoService } from './app-info.service';
import { AppInfo } from './models/app-info.model';

/**
 * GraphQL resolver for application information queries.
 *
 * Provides a query to fetch metadata about the running application.
 */
@Resolver(() => AppInfo)
export class AppInfoResolver {
  /**
   * Injects the AppInfoService to provide application metadata.
   * @param appInfoService The service providing app info data.
   */
  constructor(private readonly appInfoService: AppInfoService) {}

  /**
   * Returns application information.
   *
   * @returns {AppInfo} The application metadata.
   */
  @Query(() => AppInfo, { description: 'Get application information' })
  appInfo(): AppInfo {
    return this.appInfoService.appInfo();
  }
}

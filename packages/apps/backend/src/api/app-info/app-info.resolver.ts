import { Query, Resolver } from '@nestjs/graphql';
import { AppInfoService } from './app-info.service';
import { AppInfo } from './models/app-info.model';

@Resolver(() => AppInfo)
export class AppInfoResolver {
  constructor(private readonly appInfoService: AppInfoService) {}

  @Query(() => AppInfo, { description: 'Get application information' })
  appInfo(): AppInfo {
    return this.appInfoService.appInfo();
  }
}

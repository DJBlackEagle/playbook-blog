import { Query, Resolver } from '@nestjs/graphql';
import { SystemInfo } from './models/system-info.model';
import { SystemInfoService } from './system-info.service';

@Resolver(() => SystemInfo)
export class SystemInfoResolver {
  constructor(private readonly systemInfoService: SystemInfoService) {}

  @Query(() => SystemInfo, {
    description: 'Get system information',
  })
  async systemInfo(): Promise<SystemInfo> {
    return {
      cpu: await this.systemInfoService.getCpuInfo(),
      memory: this.systemInfoService.getMemoryInfo(),
      process: this.systemInfoService.getProcessInfo(),
      runtime: this.systemInfoService.getRuntimeInfo(),
    };
  }
}

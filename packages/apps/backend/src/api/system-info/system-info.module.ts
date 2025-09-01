import { Module } from '@nestjs/common';
import { SystemInfoService } from './system-info.service';
import { SystemInfoResolver } from './system-info.resolver';

@Module({
  providers: [SystemInfoResolver, SystemInfoService],
})
export class SystemInfoModule {}

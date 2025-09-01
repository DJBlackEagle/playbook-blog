import { Module } from '@nestjs/common';
import { AppInfoService } from './app-info.service';
import { AppInfoResolver } from './app-info.resolver';

@Module({
  providers: [AppInfoResolver, AppInfoService],
})
export class AppInfoModule {}

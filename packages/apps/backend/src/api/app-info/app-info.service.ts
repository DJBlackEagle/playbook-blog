import { Injectable } from '@nestjs/common';
import { APPINFO } from '../../constants/app-info';
import { AppInfo } from './models/app-info.model';

@Injectable()
export class AppInfoService {
  appInfo(): AppInfo {
    return {
      name: APPINFO.name,
      title: APPINFO.title,
      description: APPINFO.description,
      version: APPINFO.version,
    };
  }
}

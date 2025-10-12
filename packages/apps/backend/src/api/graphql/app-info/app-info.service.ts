import { Injectable } from '@nestjs/common';
import { APPINFO } from '../../../shared';
import { AppInfo } from './models/app-info.model';

/**
 * Service for providing application metadata.
 *
 * Supplies information such as name, title, description, and version of the app.
 */
@Injectable()
export class AppInfoService {
  /**
   * Returns application information from the shared APPINFO constant.
   *
   * @returns {AppInfo} The application metadata.
   */
  appInfo(): AppInfo {
    return {
      name: APPINFO.name,
      title: APPINFO.title,
      description: APPINFO.description,
      version: APPINFO.version,
    };
  }
}

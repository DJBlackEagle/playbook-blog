import * as path from 'path';
import { PathResolver } from './path-resolver.util';

export class FileResolver {
  static getEnvFile(): string {
    return path.resolve(PathResolver.getRootPath(), '.env');
  }

  static getConfigFile(filename: string): string {
    return path.resolve(PathResolver.getConfigPath(), filename);
  }
}

import * as path from 'path';

export class PathResolver {
  static getRootPath(): string {
    return path.resolve(process.cwd(), '../../../');
  }

  static getConfigPath(): string {
    return path.resolve(PathResolver.getRootPath(), 'config');
  }
}

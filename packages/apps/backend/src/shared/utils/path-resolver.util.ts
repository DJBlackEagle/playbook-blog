import * as path from 'path';

/**
 * Utility class for resolving important project paths.
 *
 * Provides static methods to determine the root and config directory paths
 * relative to the current working directory. Useful for consistent path resolution
 * across different environments and scripts.
 *
 * @example
 * const root = PathResolver.getRootPath();
 * const config = PathResolver.getConfigPath();
 */
export class PathResolver {
  /**
   * Gets the absolute path to the project root directory.
   *
   * @returns {string} The absolute path to the root directory.
   */
  static getRootPath(): string {
    return path.resolve(process.cwd(), '../../../');
  }

  /**
   * Gets the absolute path to the config directory within the project root.
   *
   * @returns {string} The absolute path to the config directory.
   */
  static getConfigPath(): string {
    return path.resolve(PathResolver.getRootPath(), 'config');
  }
}

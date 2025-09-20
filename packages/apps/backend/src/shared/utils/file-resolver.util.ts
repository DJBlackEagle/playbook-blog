import * as path from 'path';
import { PathResolver } from './path-resolver.util';

/**
 * Utility class for resolving important file paths in the project.
 *
 * Provides static methods to determine the absolute paths to environment and config files
 * based on the project structure. Useful for consistent file resolution across environments.
 *
 * @example
 * const envPath = FileResolver.getEnvFile();
 * const configPath = FileResolver.getConfigFile('app.config.ts');
 */
export class FileResolver {
  /**
   * Gets the absolute path to the .env file at the project root.
   *
   * @returns {string} The absolute path to the .env file.
   */
  static getEnvFile(): string {
    return path.resolve(PathResolver.getRootPath(), '.env');
  }

  /**
   * Gets the absolute path to a config file within the config directory.
   *
   * @param filename - The name of the config file (e.g., 'app.config.ts').
   * @returns {string} The absolute path to the specified config file.
   */
  static getConfigFile(filename: string): string {
    return path.resolve(PathResolver.getConfigPath(), filename);
  }
}

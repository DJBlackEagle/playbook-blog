/**
 * Application metadata constants.
 *
 * @property {string} name        - The npm package name from environment or empty string.
 * @property {string} title       - The human-readable application title.
 * @property {string} description - A short description of the application.
 * @property {string} version     - The npm package version from environment or empty string.
 *
 * @example
 * import { APPINFO } from './app-info';
 * console.log(APPINFO.title); // 'Blog Backend'
 */
const APPINFO = {
  name: process.env.npm_package_name || '',
  title: 'Blog Backend',
  description: 'Backend for the Blog application',
  version: process.env.npm_package_version || '',
};

export { APPINFO };

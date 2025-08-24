// import os from 'os';

export class OsHelper {
  static getUptime(): number {
    return 0; //os.uptime();
  }

  static getPlatform(): string {
    return 'N/A'; //os.platform();
  }

  static getArch(): string {
    return 'N/A'; //os.arch();
  }

  static getType(): string {
    return 'N/A'; //os.type();
  }

  static getRelease(): string {
    return 'N/A'; //os.release();
  }

  static getEOL(): string {
    return 'N/A'; //os.EOL;
  }
}

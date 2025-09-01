export class RuntimeHelper {
  static getNodeEnv(): string {
    return process.env.NODE_ENV || 'N/A';
  }
}

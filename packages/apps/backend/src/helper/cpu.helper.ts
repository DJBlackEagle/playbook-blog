import os from 'os';

export class CpuHelper {
  static getUsage(): Promise<number> {
    return new Promise((resolve) => {
      const start = process.cpuUsage();
      setTimeout(() => {
        const end = process.cpuUsage(start);
        const cpu = (end.user + end.system) / 1000;
        resolve(cpu);
      }, 100);
    });
  }

  static getCpus(): os.CpuInfo[] {
    return os.cpus();
  }
}

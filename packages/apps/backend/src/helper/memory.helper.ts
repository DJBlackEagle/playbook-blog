export class MemoryHelper {
  static getUsage(): NodeJS.MemoryUsage {
    return process.memoryUsage();
  }

  static getTotal(): number {
    return process.constrainedMemory();
  }

  static getFree(): number {
    return process.availableMemory();
  }

  static getHeapStatistics(): number {
    return process.memoryUsage().heapTotal;
  }
}

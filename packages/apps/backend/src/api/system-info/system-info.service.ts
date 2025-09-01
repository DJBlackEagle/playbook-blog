import { Injectable } from '@nestjs/common';
import {
  CpuHelper,
  MemoryHelper,
  ProcessHelper,
  RuntimeHelper,
} from '../../helper';
import { SystemInfoCpu } from './models/system-info-cpu.model';
import { SystemInfoMemory } from './models/system-info-memory.model';
import { SystemInfoProcess } from './models/system-info-process.model';
import { SystemInfoRuntime } from './models/system-info-runtime.model';

@Injectable()
export class SystemInfoService {
  constructor() {}

  async getCpuInfo(): Promise<SystemInfoCpu> {
    return {
      cpuUsage: await CpuHelper.getUsage(),
    };
  }

  getMemoryInfo(): SystemInfoMemory {
    return {
      freemem: MemoryHelper.getFree(),
      totalmem: MemoryHelper.getTotal(),
      heapTotal: MemoryHelper.getHeapStatistics(),
    };
  }

  getProcessInfo(): SystemInfoProcess {
    return {
      uptime: ProcessHelper.getUptime(),
    };
  }

  getRuntimeInfo(): SystemInfoRuntime {
    return {
      nodeEnv: RuntimeHelper.getNodeEnv(),
    };
  }
}

import { Field, ObjectType } from '@nestjs/graphql';
import { SystemInfoCpu } from './system-info-cpu.model';
import { SystemInfoMemory } from './system-info-memory.model';
import { SystemInfoProcess } from './system-info-process.model';
import { SystemInfoRuntime } from './system-info-runtime.model';

@ObjectType({ description: 'System Information Model' })
export class SystemInfo {
  @Field(() => SystemInfoCpu, { description: 'CPU information' })
  cpu: SystemInfoCpu;

  @Field(() => SystemInfoMemory, { description: 'Memory information' })
  memory: SystemInfoMemory;

  @Field(() => SystemInfoProcess, { description: 'Process information' })
  process: SystemInfoProcess;

  @Field(() => SystemInfoRuntime, { description: 'Runtime information' })
  runtime: SystemInfoRuntime;
}

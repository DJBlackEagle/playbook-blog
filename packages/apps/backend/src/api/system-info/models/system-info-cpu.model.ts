import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'CPU Information Model' })
export class SystemInfoCpu {
  @Field({ description: 'CPU usage in milliseconds' })
  cpuUsage: number;
}

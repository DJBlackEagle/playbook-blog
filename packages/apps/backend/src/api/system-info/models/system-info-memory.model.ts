import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Memory Information Model' })
export class SystemInfoMemory {
  @Field({ description: 'Total memory in bytes' })
  totalmem: number;

  @Field({ description: 'Free memory in bytes' })
  freemem: number;

  @Field({ description: 'Heap total memory in bytes' })
  heapTotal: number;
}

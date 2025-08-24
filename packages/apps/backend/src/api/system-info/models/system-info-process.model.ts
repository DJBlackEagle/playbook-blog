import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Process Information Model' })
export class SystemInfoProcess {
  @Field({ description: 'Process Uptime' })
  uptime: number;
}

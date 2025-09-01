import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Runtime Information Model' })
export class SystemInfoRuntime {
  @Field({ description: 'Node environment' })
  nodeEnv: string;
}

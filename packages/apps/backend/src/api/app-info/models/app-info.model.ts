import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Information about the application' })
export class AppInfo {
  @Field({ description: 'The name of the application' })
  name: string;

  @Field({ description: 'The title of the application' })
  title: string;

  @Field({ description: 'A brief description of the application' })
  description: string;

  @Field({ description: 'The current version of the application' })
  version: string;
}

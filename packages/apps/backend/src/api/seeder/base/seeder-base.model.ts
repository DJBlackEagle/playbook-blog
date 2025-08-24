import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Base model for seeder operations' })
export class SeederBase {
  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was started',
  })
  startedAt: Date;

  @Field(() => Date, {
    description: 'Timestamp of when the seeding operation was completed',
  })
  completedAt: Date;

  @Field(() => Boolean, {
    description: 'Indicates if the seeding operation was successful',
    defaultValue: false,
  })
  success: boolean;

  @Field(() => String, {
    description: 'Optional error message if the seeding operation failed',
    nullable: true,
  })
  error?: string;
}

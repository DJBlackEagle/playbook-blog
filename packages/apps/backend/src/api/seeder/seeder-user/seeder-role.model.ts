import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { SeederBase } from '../base/seeder-base.model';

@ObjectType({ description: 'Seeder model for users' })
export class SeederUser extends SeederBase {
  @Field(() => [User], { description: 'List of users', nullable: true })
  users?: User[];
}

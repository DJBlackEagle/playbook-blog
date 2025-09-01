import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../role/models/role.model';
import { SeederBase } from '../base/seeder-base.model';

@ObjectType({ description: 'Seeder model for roles' })
export class SeederRole extends SeederBase {
  @Field(() => [Role], { description: 'List of roles', nullable: true })
  roles?: Role[];
}

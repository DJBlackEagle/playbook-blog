import { Field, ObjectType } from '@nestjs/graphql';
import { CursorConnection, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseModel } from '../../../base';
import { User } from '../../user/models/user.model';

@ObjectType('Role', { description: 'Role model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
@CursorConnection('users', () => User, {
  description: 'Users associated with the role',
  nullable: true,
})
export class Role extends BaseModel {
  @Field({ description: 'Name of the role' })
  name: string;

  @Field({ nullable: true, description: 'Description of the role' })
  description?: string;

  @Field({ description: 'Indicates if the role is a system role' })
  isSystemRole: boolean;

  @Field(() => [User], {
    nullable: true,
    description: 'Users associated with this role',
  })
  users?: User[];
}

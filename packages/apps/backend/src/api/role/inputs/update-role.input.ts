import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRoleInput } from './create-role.input';

@InputType({ description: 'Input for updating a role' })
export class UpdateRoleInput extends PartialType(CreateRoleInput) {}

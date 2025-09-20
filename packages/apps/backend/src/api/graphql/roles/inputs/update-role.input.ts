import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRoleInput } from './create-role.input';

/**
 * Input type for updating a role.
 *
 * Extends all fields from CreateRoleInput as optional, allowing partial updates.
 */
@InputType({ description: 'Input for updating a role' })
export class UpdateRoleInput extends PartialType(CreateRoleInput) {}

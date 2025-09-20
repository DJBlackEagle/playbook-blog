import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

/**
 * GraphQL input type for updating a user.
 *
 * Inherits all fields from CreateUserInput as optional using PartialType.
 */
@InputType({ description: 'Input for updating a user' })
export class UpdateUserInput extends PartialType(CreateUserInput) {}

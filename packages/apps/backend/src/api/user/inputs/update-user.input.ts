import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType({ description: 'Input for updating a user' })
export class UpdateUserInput extends PartialType(CreateUserInput) {}

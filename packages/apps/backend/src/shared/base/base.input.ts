import { InputType } from '@nestjs/graphql';

/**
 * Base GraphQL InputType with common fields.
 * Extend this for your feature input types.
 *
 * @example
 * @InputType()
 * export class CreateUserInput extends BaseInput { ... }
 */
@InputType({ isAbstract: true })
export class BaseInput {}

import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

/**
 * Input type for updating an existing post.
 *
 * Extends {@link CreatePostInput} and makes all fields optional for partial updates.
 */
@InputType({ description: 'Input for updating an existing post' })
export class UpdatePostInput extends PartialType(CreatePostInput) {}

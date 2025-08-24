import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

@InputType({ description: 'Input for updating an existing post' })
export class UpdatePostInput extends PartialType(CreatePostInput) {}

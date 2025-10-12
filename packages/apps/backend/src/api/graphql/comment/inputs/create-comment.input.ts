import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseInput } from '../../../../shared';

/**
 * Input type for creating a new comment.
 *
 * Extends the base input and provides fields for comment content and the associated post ID.
 *
 * @example
 * {
 *   content: "Great post!",
 *   postId: "652a1b2c3d4e5f6a7b8c9d0e"
 * }
 */
@InputType({ description: 'Input for creating a comment' })
export class CreateCommentInput extends PartialType(BaseInput) {
  /**
   * The content of the comment.
   * @example "Great post!"
   */
  @Field({ description: 'The content of the comment.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  content: string;

  /**
   * The ID of the post the comment belongs to.
   * @example "652a1b2c3d4e5f6a7b8c9d0e"
   */
  @Field(() => ID, {
    description: 'The ID of the post the comment belongs to.',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  post: string;
}

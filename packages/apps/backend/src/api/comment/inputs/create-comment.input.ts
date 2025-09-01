import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseCreateInput } from '../../../base';

@InputType({ description: 'Input for creating a comment' })
export class CreateCommentInput extends PartialType(BaseCreateInput) {
  @Field({ description: 'The content of the comment.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  content: string;

  @Field(() => ID, {
    description: 'The ID of the post the comment belongs to.',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  postId: string;
}

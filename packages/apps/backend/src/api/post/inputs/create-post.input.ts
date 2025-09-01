import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseCreateInput } from '../../../base';

@InputType({ description: 'Input for creating a post' })
export class CreatePostInput extends PartialType(BaseCreateInput) {
  @Field({ description: 'The title of the post.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @Field({ description: 'The content of the post.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content!: string;
}

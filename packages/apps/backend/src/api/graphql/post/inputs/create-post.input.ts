import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseInput } from '../../../../shared';

/**
 * Input type for creating a new post.
 *
 * Extends the base input and provides fields for title, teaser, content, and optional sources.
 */
@InputType({ description: 'Input for creating a post' })
export class CreatePostInput extends PartialType(BaseInput) {
  /**
   * The title of the post.
   * @example "How to use NestJS with GraphQL"
   */
  @Field({ description: 'The title of the post.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  /**
   * The teaser or summary of the post.
   * @example "A quick guide to integrating NestJS and GraphQL."
   */
  @Field({ description: 'The teaser of the post.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  teaser!: string;

  /**
   * The main content of the post.
   * @example "NestJS provides a powerful way to build GraphQL APIs..."
   */
  @Field({ description: 'The content of the post.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content!: string;

  /**
   * Optional sources or references for the post.
   * @example ["https://nestjs.com", "https://graphql.org"]
   */
  @Field(() => [String], { description: 'The sources of the post.' })
  @IsOptional()
  @IsString({ each: true })
  sources?: string[];
}

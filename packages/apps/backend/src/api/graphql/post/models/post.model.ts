import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField, QueryOptions } from '@ptc-org/nestjs-query-graphql';
import { BaseModel } from '../../../../shared';

/**
 * GraphQL model representing a blog post.
 *
 * Includes title, teaser, content, optional sources, and associated comments. Used for querying and filtering posts.
 *
 * @example
 * {
 *   title: "Understanding GraphQL in NestJS",
 *   teaser: "A quick introduction to GraphQL integration with NestJS.",
 *   content: "GraphQL is a query language for APIs...",
 *   sources: ["https://nestjs.com", "https://graphql.org"],
 *   comments: [ { ... }, { ... } ]
 * }
 */
@ObjectType('Post', { description: 'Post model' })
@QueryOptions({ defaultFilter: { deleted: { is: false } } })
export class Post extends BaseModel {
  /**
   * Title of the post.
   * @example "Understanding GraphQL in NestJS"
   */
  @Field({ description: 'Title of the post' })
  @FilterableField()
  title: string;

  /**
   * Teaser or summary of the post.
   * @example "A quick introduction to GraphQL integration with NestJS."
   */
  @Field({ description: 'Teaser of the post' })
  @FilterableField()
  teaser: string;

  /**
   * Main content of the post.
   * @example "GraphQL is a query language for APIs..."
   */
  @Field({ description: 'Content of the post' })
  @FilterableField()
  content: string;

  /**
   * Optional sources or references for the post.
   * @example ["https://nestjs.com", "https://graphql.org"]
   */
  @Field(() => [String], {
    nullable: true,
    description: 'Sources of the post',
  })
  sources?: string[];
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Information about the application' })
/**
 * Represents metadata information about the application, including its name, title, description, and version.
 *
 * @remarks
 * This model is used to expose application information via the GraphQL API.
 *
 * @property name - The name of the application.
 * @property title - The title of the application.
 * @property description - A brief description of the application.
 * @property version - The current version of the application.
 */
export class AppInfo {
  /**
   * The name of the application.
   */
  @Field({ description: 'The name of the application' })
  name: string;

  /**
   * The title of the application.
   */
  @Field({ description: 'The title of the application' })
  title: string;

  /**
   * A brief description of the application.
   */
  @Field({ description: 'A brief description of the application' })
  description: string;

  /**
   * The current version of the application.
   *
   * This property holds the version string that identifies the current release
   * or build of the application. It is typically used for display purposes,
   * compatibility checks, or debugging.
   */
  @Field({ description: 'The current version of the application' })
  version: string;
}

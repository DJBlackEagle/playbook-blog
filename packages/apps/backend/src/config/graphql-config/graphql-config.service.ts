import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';

interface OriginalError {
  statusCode?: number;
  message?: string;
  [key: string]: unknown;
}

/**
 * Service providing GraphQL configuration options.
 */
@Injectable()
export class GraphQLConfigService implements ApolloDriverConfigFactory {
  constructor() {}

  /**
   * Returns GraphQL module configuration.
   * @returns {Omit<ApolloDriverConfig, 'driver'>} GraphQL options for NestJS GraphQLModule
   */
  public createGqlOptions(): Omit<ApolloDriverConfig, 'driver'> {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return {
      autoSchemaFile: 'schema.gql',
      playground: false,
      debug: isDevelopment,
      plugins: [
        isDevelopment
          ? ApolloServerPluginLandingPageLocalDefault({
              footer: false,
              embed: { endpointIsEditable: false },
            })
          : ApolloServerPluginLandingPageProductionDefault({
              footer: true,
            }),
      ],
      formatError: (error) => {
        const originalError = error.extensions?.originalError as
          | OriginalError
          | undefined;

        const extensions = { ...error.extensions }; //

        if (!isDevelopment && 'stacktrace' in extensions) {
          delete extensions.stacktrace;
        }

        if (!isDevelopment && 'code' in extensions) {
          delete extensions.code;
        }

        if (
          originalError &&
          originalError.statusCode === 400 &&
          originalError.message
        ) {
          return {
            message: originalError.message,
            code: 'VALIDATION_ERROR',
            extensions: {
              ...extensions,
              validationErrors: originalError.message,
              exception: undefined,
              originalError: undefined,
            },
          };
        }

        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          extensions: extensions,
        };
      },
    };
  }
}

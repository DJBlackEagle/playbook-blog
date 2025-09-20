/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service providing GraphQL configuration options.
 */
@Injectable()
export class GraphQLConfigService implements ApolloDriverConfigFactory {
  constructor(private readonly configService: ConfigService) {}

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
      formatError: (error, context?: unknown) => {
        const originalError = error.extensions?.originalError as any;

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

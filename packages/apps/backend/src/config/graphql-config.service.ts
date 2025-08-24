/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig, ApolloDriverConfigFactory } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphQLConfigService implements ApolloDriverConfigFactory {
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
        const originalError = error.extensions?.originalError as any;

        // Erstelle eine Kopie der ursprünglichen Extensions, falls vorhanden,
        // um sie zu manipulieren, ohne das Original zu verändern.
        const extensions = { ...error.extensions }; //

        // Entferne den stacktrace aus den extensions, falls vorhanden.
        if (!isDevelopment && 'stacktrace' in extensions) {
          delete extensions.stacktrace;
        }

        if (!isDevelopment && 'code' in extensions) {
          delete extensions.code;
        }

        // Spezifische Behandlung für Validierungsfehler
        if (
          originalError &&
          originalError.statusCode === 400 &&
          originalError.message
        ) {
          return {
            message: originalError.message, // Array von Fehlermeldungen von class-validator
            code: 'VALIDATION_ERROR', // Ein spezifischer Code für Validierungsfehler
            extensions: {
              ...extensions, // Behalte die bereits bereinigten Extensions bei
              validationErrors: originalError.message, // Füge die detaillierten Fehler hinzu
              exception: undefined, // Entferne das generische Exception-Objekt
              originalError: undefined, // Entferne das ursprüngliche Error-Objekt
              // Stelle sicher, dass 'code' hier nicht 'BAD_REQUEST' bleibt,
              // wenn wir es als 'VALIDATION_ERROR' oben setzen.
              // Wir haben es bereits durch 'VALIDATION_ERROR' ersetzt oder lassen es weg,
              // wenn es nicht existiert.
            },
          };
        }

        // Für alle anderen Fehler (nicht-Validierungsfehler) gib sie im Standardformat zurück
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          extensions: extensions, // Gib die bereinigten Extensions zurück
        };
      },
    };
  }
}

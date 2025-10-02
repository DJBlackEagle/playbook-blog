import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigVariables } from './environment-config.constants';

/**
 * Service for accessing environment-specific configuration variables.
 * Wraps NestJS ConfigService and provides typed, categorized getters for application settings.
 *
 * Example:
 * ```typescript
 * const jwtSecret = environmentConfigService.jwt.token.secret();
 * const argon2Time = environmentConfigService.encryption.argon2.time();
 * ```
 *
 * @remarks
 * All configuration values are retrieved from environment variables with sensible defaults.
 *
 * @see ConfigService
 */
@Injectable()
export class EnvironmentConfigService {
  readonly database = {
    /**
     * Gets the database URL.
     * @returns {string} The database connection URL.
     */
    url: (): string =>
      this.configService.get<string>(
        EnvironmentConfigVariables.DATABASE.URL.NAME,
        EnvironmentConfigVariables.DATABASE.URL.DEFAULT_VALUE,
      ),
  };

  /**
   * Encryption configuration category.
   */
  readonly encryption = {
    /**
     * Argon2 configuration category.
     */
    argon2: {
      /**
       * Gets the Argon2 hashing time cost.
       * @returns {number} The time cost for Argon2.
       */
      time: (): number =>
        this.configService.get<number>(
          EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.NAME,
          EnvironmentConfigVariables.ENCRYPTION.ARGON2.TIME.DEFAULT_VALUE,
        ),

      /**
       * Gets the Argon2 memory cost.
       * @returns {number} The memory cost for Argon2.
       */
      memory: (): number =>
        this.configService.get<number>(
          EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.NAME,
          EnvironmentConfigVariables.ENCRYPTION.ARGON2.MEMORY.DEFAULT_VALUE,
        ),

      /**
       * Gets the Argon2 parallelism factor.
       * @returns {number} The parallelism factor for Argon2.
       */
      parallelism: (): number =>
        this.configService.get<number>(
          EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM.NAME,
          EnvironmentConfigVariables.ENCRYPTION.ARGON2.PARALLELISM
            .DEFAULT_VALUE,
        ),
    },

    /**
     * Gets the password pepper value.
     * @returns {string} The password pepper.
     */
    pepper: (): string =>
      this.configService.get<string>(
        EnvironmentConfigVariables.ENCRYPTION.PEPPER.NAME,
        EnvironmentConfigVariables.ENCRYPTION.PEPPER.DEFAULT_VALUE,
      ),
  };

  /**
   * JWT configuration category.
   */
  readonly jwt = {
    /**
     * Gets the JWT issuer string.
     * @returns {string} The JWT issuer.
     */
    issuer: (): string =>
      this.configService.get<string>(
        EnvironmentConfigVariables.JWT.ISSUER.NAME,
        EnvironmentConfigVariables.JWT.ISSUER.DEFAULT_VALUE,
      ),

    audience: (): string =>
      this.configService.get<string>(
        EnvironmentConfigVariables.JWT.AUDIENCE.NAME,
        EnvironmentConfigVariables.JWT.AUDIENCE.DEFAULT_VALUE,
      ),

    /*
     * Token configuration category.
     */
    token: {
      /**
       * Gets the JWT secret key.
       * @returns {string} The JWT secret.
       */
      secret: (): string =>
        this.configService.get<string>(
          EnvironmentConfigVariables.JWT.TOKEN.SECRET.NAME,
          EnvironmentConfigVariables.JWT.TOKEN.SECRET.DEFAULT_VALUE,
        ),

      /**
       * Gets the JWT expiration time.
       * @returns {string} The JWT expiration time (e.g., '1h').
       */
      expiresIn: (): string =>
        this.configService.get<string>(
          EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.NAME,
          EnvironmentConfigVariables.JWT.TOKEN.EXPIRES_IN.DEFAULT_VALUE,
        ),
    },

    /*
     * Refresh token configuration category.
     */
    refresh: {
      /**
       * Gets the JWT refresh token secret key.
       * @returns {string} The JWT refresh secret.
       */
      secret: (): string =>
        this.configService.get<string>(
          EnvironmentConfigVariables.JWT.REFRESH.SECRET.NAME,
          EnvironmentConfigVariables.JWT.REFRESH.SECRET.DEFAULT_VALUE,
        ),

      /**
       * Gets the JWT refresh token expiration time.
       * @returns {string} The JWT refresh expiration time (e.g., '7h').
       */
      expiresIn: (): string =>
        this.configService.get<string>(
          EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.NAME,
          EnvironmentConfigVariables.JWT.REFRESH.EXPIRES_IN.DEFAULT_VALUE,
        ),
    },
  };

  /**
   * Creates an instance of EnvironmentConfigService.
   * @param configService - The NestJS ConfigService instance.
   */
  constructor(private readonly configService: ConfigService) {}
}

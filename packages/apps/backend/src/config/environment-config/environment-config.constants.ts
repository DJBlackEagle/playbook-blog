/**
 * Application configuration constants.
 *
 * Contains environment variable names and their default values for various
 * application settings such as host, JWT, Argon2, and password pepper.
 */
const EnvironmentConfigVariables = {
  DATABASE: {
    URL: {
      NAME: 'DATABASE_URL',
      DEFAULT_VALUE: '',
    },
  },
  ENCRYPTION: {
    ARGON2: {
      TIME: {
        NAME: 'ENCRYPTION_ARGON2_TIME',
        DEFAULT_VALUE: 3,
      },

      MEMORY: {
        NAME: 'ENCRYPTION_ARGON2_MEMORY',
        DEFAULT_VALUE: 65536,
      },
      PARALLELISM: {
        NAME: 'ENCRYPTION_ARGON2_PARALLELISM',
        DEFAULT_VALUE: 1,
      },
    },
    PEPPER: {
      NAME: 'ENCRYPTION_PEPPER',
      DEFAULT_VALUE: 'dev-pw-pepper-change-me',
    },
  },
  JWT: {
    ISSUER: {
      NAME: 'JWT_ISSUER',
      DEFAULT_VALUE: 'Blog - NestJS Backend Server',
    },
    AUDIENCE: {
      NAME: 'JWT_AUDIENCE',
      DEFAULT_VALUE: 'localhost.local',
    },
    REFRESH: {
      SECRET: {
        NAME: 'JWT_REFRESH_SECRET',
        DEFAULT_VALUE: 'dev-secret-refresh',
      },
      EXPIRES_IN: {
        NAME: 'JWT_REFRESH_EXPIRES_IN',
        DEFAULT_VALUE: '7h',
      },
    },
    TOKEN: {
      SECRET: {
        NAME: 'JWT_TOKEN_SECRET',
        DEFAULT_VALUE: 'dev-secret-change-me',
      },
      EXPIRES_IN: {
        NAME: 'JWT_TOKEN_EXPIRES_IN',
        DEFAULT_VALUE: '1h',
      },
    },
  },
};

export { EnvironmentConfigVariables };

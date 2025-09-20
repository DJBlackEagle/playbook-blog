/**
 * Application configuration constants.
 *
 * Contains environment variable names and their default values for various
 * application settings such as host, JWT, Argon2, and password pepper.
 */
const CONFIG = {
  HOST: {
    NAME: 'HOST',
    DEFAULT_VALUE: '127.0.0.1',
  },
  ARGON2_TIME: {
    NAME: 'ARGON2_TIME',
    DEFAULT_VALUE: 3,
  },
  ARGON2_MEMORY: {
    NAME: 'ARGON2_MEMORY',
    DEFAULT_VALUE: 65536,
  },
  ARGON2_PARALLELISM: {
    NAME: 'ARGON2_PARALLELISM',
    DEFAULT_VALUE: 1,
  },
  PASSWORD_PEPPER: {
    NAME: 'PASSWORD_PEPPER',
    DEFAULT_VALUE: 'dev-pw-pepper-change-me',
  },
  JWT_SECRET: {
    NAME: 'JWT_SECRET',
    DEFAULT_VALUE: 'dev-secret-change-me',
  },
  JWT_EXPIRES_IN: {
    NAME: 'JWT_EXPIRES_IN',
    DEFAULT_VALUE: '1h',
  },
  JWT_ISSUER: {
    NAME: 'JWT_ISSUER',
    DEFAULT_VALUE: 'Blog - NestJS Backend Server',
  },
  JWT_REFRESH_SECRET: {
    NAME: 'JWT_REFRESH_SECRET',
    DEFAULT_VALUE: 'dev-secret-refresh',
  },
  JWT_REFRESH_EXPIRES_IN: {
    NAME: 'JWT_REFRESH_EXPIRES_IN',
    DEFAULT_VALUE: '7h',
  },
};

export { CONFIG };

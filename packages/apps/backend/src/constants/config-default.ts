/**
 * Default configuration values for the backend server.
 *
 * @property {string} HOST - The hostname or IP address the server binds to.
 * @property {number} PORT - The port number the server listens on.
 * @property {number} ARGON2_TIME - Number of iterations (time cost) for Argon2 password hashing.
 * @property {number} ARGON2_MEMORY - Amount of memory (in KB) used for Argon2 password hashing.
 * @property {number} ARGON2_PARALLELISM - Degree of parallelism for Argon2 password hashing.
 * @property {string} PASSWORD_PEPPER - Secret value added to passwords before hashing for extra security.
 * @property {string} JWT_SECRET - Secret key for signing and verifying JWT tokens.
 * @property {string} JWT_REFRESH_SECRET - Secret key for signing and verifying JWT refresh tokens.
 * @property {string} JWT_EXPIRES_IN - Duration for which JWT tokens are valid (e.g., '1h').
 * @property {string} JWT_REFRESH_EXPIRES_IN - Duration for which JWT refresh tokens are valid (e.g., '7h').
 * @property {string} JWT_ISSUER - Issuer string for JWT tokens.
 */
export const ConfigDefaults = {
  // ARGON2_TIME specifies the number of iterations (time cost) for the Argon2 password hashing algorithm.
  // Higher values increase security but also increase computation time.
  ARGON2_TIME: 3,

  // ARGON2_MEMORY specifies the amount of memory (in KB) to use for the Argon2 password hashing algorithm.
  // Higher values increase security but also increase memory usage.
  ARGON2_MEMORY: 65536,

  // ARGON2_PARALLELISM specifies the degree of parallelism for the Argon2 password hashing algorithm.
  // Higher values can improve performance on multi-core systems.
  ARGON2_PARALLELISM: 1,

  // PASSWORD_PEPPER is a secret value added to passwords before hashing.
  // It is used to protect against rainbow table attacks.
  PASSWORD_PEPPER: 'dev-pw-pepper-change-me',

  // JWT_SECRET is the secret key used to sign and verify JSON Web Tokens (JWT) for authentication.
  // Replace 'dev-secret-change-me' with a strong, unique value in production environments to ensure security.
  JWT_SECRET: 'dev-secret-change-me',

  // JWT_REFRESH_SECRET is the secret key used to sign and verify JWT refresh tokens.
  // This value should be kept secure and unique for each environment.
  JWT_REFRESH_SECRET: 'dev-secret-refresh',

  // JWT_EXPIRES_IN is the duration for which the JWT token is valid.
  // Replace '1h' with a suitable value as per your application's requirements.
  JWT_EXPIRES_IN: '1h',

  // Duration for which the JWT refresh token remains valid.
  // Format: <number><unit>, e.g., 7h for 7 hours, 30m for 30 minutes.
  // Adjust this value to control how long users can refresh their authentication tokens.
  JWT_REFRESH_EXPIRES_IN: '7h',

  // JWT_ISSUER is the issuer string for JWT tokens.
  JWT_ISSUER: 'Blog - NestJS Backend Server',

  // HOST is the hostname.
  HOST: '127.0.0.2',

  // PORT is the port number the server listens on.
  PORT: 3000,
};

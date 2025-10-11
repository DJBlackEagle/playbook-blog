/* istanbul ignore file */
import { Prop, Schema } from '@nestjs/mongoose';
import { TokenEntity } from './token.entity';
/**
 * Represents a user session subdocument for MongoDB.
 *
 * Stores session identifier, authentication token, and refresh token as subdocuments.
 *
 * @property {string} id - Unique identifier for the user session.
 * @property {TokenEntity} authToken - Authentication token subdocument for the session.
 * @property {TokenEntity} refreshToken - Refresh token subdocument for the session.
 *
 * @example
 * const session: UserSessionEntity = {
 *   id: 'session123',
 *   authToken: { ... },
 *   refreshToken: { ... },
 * };
 */
@Schema()
class UserSessionEntity {
  /**
   * Authentication token for the session.
   */
  @Prop({ type: TokenEntity, required: true })
  authToken: TokenEntity;

  /**
   * Refresh token for the session.
   */
  @Prop({ type: TokenEntity, required: true })
  refreshToken: TokenEntity;
}

export { UserSessionEntity };

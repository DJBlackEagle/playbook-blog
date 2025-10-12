/* istanbul ignore file */
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

/**
 * Represents a token subdocument for a user session.
 *
 * Stores token identifier, validity period, and hashed value.
 *
 * @example
 * const token: TokenEntity = {
 *   tokenId: 'abc123',
 *   validSince: new Date('2025-01-01'),
 *   validUntil: new Date('2025-12-31'),
 *   hash: 'hashed_token_value',
 * };
 */
@Schema()
class TokenEntity {
  /**
   * Unique identifier for the token.
   */
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  tokenId: Types.ObjectId;

  /**
   * The date and time when the token became valid.
   */
  @Prop({ required: true })
  validSince: Date;

  /**
   * The date and time when the token expires.
   */
  @Prop({ required: true })
  validUntil: Date;

  /**
   * Hashed value of the token.
   */
  @Prop({ required: true })
  hash: string;
}

export { TokenEntity };

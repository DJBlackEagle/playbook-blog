import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Base Mongoose entity with common fields for all entities.
 *
 * Extend this abstract class for your feature entities to inherit
 * standard fields and soft-delete support.
 *
 * @example
 * @Schema()
 * export class UserEntity extends BaseEntity {
 *   @Prop() name: string;
 * }
 */
@Schema({ timestamps: true })
export abstract class BaseEntity extends Document {
  /**
   * The date and time when the document was created.
   * Set automatically by Mongoose.
   */
  @Prop({ type: Date })
  createdAt?: Date;

  /**
   * The date and time when the document was last updated.
   * Set automatically by Mongoose.
   */
  @Prop({ type: Date })
  updatedAt?: Date;

  /**
   * Indicates if the document is soft-deleted.
   * Use this for soft-delete logic instead of removing documents.
   * @default false
   */
  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  /**
   * The date and time when the document was soft-deleted.
   * Should be set when deleted is true.
   */
  @Prop({ type: Date })
  deletedAt!: Date;
}

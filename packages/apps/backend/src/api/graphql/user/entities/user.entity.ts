/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query, SchemaTypes, Types } from 'mongoose';
import { EnvironmentConfigService } from '../../../../config/environment-config/environment-config.service';
import { EncryptionService } from '../../../../modules/encryption';
import { BaseEntity } from '../../../../shared';

/**
 * Middleware function to hash the password field during update operations.
 *
 * This function checks if a password is present in the update payload (directly, in `$set`, or in `$setOnInsert`).
 * If a password is found, it hashes the password using the `EncryptionService` before the update is applied.
 * The hashed password replaces the plain text password in the update object.
 *
 * @param next - Callback to proceed to the next middleware or operation.
 * @returns A promise that resolves when the password has been hashed and the update can proceed.
 */
async function hashOnUpdate(this: any, next: () => void): Promise<void> {
  const update = this.getUpdate() || {};
  const pwd =
    update.password ?? update.$set?.password ?? update.$setOnInsert?.password;
  if (!pwd) return next();

  const environmentConfigService = new EnvironmentConfigService(
    new ConfigService(),
  );
  const encryptionService = new EncryptionService(environmentConfigService);
  const hashed = await encryptionService.hash(`${pwd}`);
  if (update.password) update.password = hashed;
  if (update.$set?.password) update.$set.password = hashed;
  if (update.$setOnInsert?.password) update.$setOnInsert.password = hashed;
  next();
}

/**
 * Mongoose entity representing a user document.
 *
 * Contains authentication, contact, and role information for a user.
 */
@Schema({ timestamps: true })
class UserEntity extends BaseEntity {
  /**
   * Unique username for the user.
   */
  @Prop({ unique: true, required: true })
  username: string;

  /**
   * Unique email address for the user.
   */
  @Prop({ unique: true, required: true })
  email: string;

  /**
   * Hashed password for the user.
   */
  @Prop({ required: true })
  password: string;

  /**
   * Timestamp of the user's last login.
   */
  @Prop()
  lastLogin: Date;

  /**
   * Token identifier for session or JWT tracking.
   */
  @Prop()
  tokenIdentifier: string;

  /**
   * Hashed refresh token for the user.
   */
  @Prop()
  refreshTokenHash: string;

  /**
   * Reference to the user's role (ObjectId).
   */
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Role', required: false })
  role: Types.ObjectId;
}

/**
 * Mongoose schema for the User entity.
 *
 * Defines schema structure, indexes, and middleware for password hashing and sorting.
 */
const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

/**
 * Middleware to ensure default sorting by username for find queries.
 * Adds username sort if not present in query options.
 *
 * @param this - The current Mongoose query instance.
 */
UserEntitySchema.pre('find', function (this: Query<any, any>): void {
  const sort = this.getOptions().sort as
    | Record<string, 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending'>
    | undefined;

  if (sort && Object.keys(sort).length > 0) {
    if (!sort._id) {
      this.sort({ ...sort, username: 1 });
    }
  } else {
    this.sort({ username: 1 });
  }
});

/**
 * Middleware to hash the password before saving a user document.
 * Only hashes if the password field is modified.
 *
 * @param next - Callback to proceed to the next middleware or operation.
 */
UserEntitySchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) return next();

  const environmentConfigService = new EnvironmentConfigService(
    new ConfigService(),
  );
  const encryptionService = new EncryptionService(environmentConfigService);
  this.password = await encryptionService.hash(this.password);
  next();
});

/**
 * Middleware to hash the password during update operations (findOneAndUpdate, updateOne, updateMany).
 * Ensures password is securely hashed if present in the update payload.
 */
UserEntitySchema.pre('findOneAndUpdate', hashOnUpdate);
UserEntitySchema.pre('updateOne', hashOnUpdate);
UserEntitySchema.pre('updateMany', hashOnUpdate);

/**
 * Mongoose model definition for the User entity.
 *
 * Used to register the User schema with Mongoose.
 */
const UserEntityModel: ModelDefinition = {
  name: 'User',
  schema: UserEntitySchema,
};

export { UserEntity, UserEntityModel, UserEntitySchema };

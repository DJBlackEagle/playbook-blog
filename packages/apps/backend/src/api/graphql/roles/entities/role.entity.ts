/* istanbul ignore file */
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query } from 'mongoose';
import { BaseEntity } from '../../../../shared';

/**
 * Mongoose schema for the Role entity.
 *
 * Represents a user role in the database, including name, description, and system status.
 *
 * @extends BaseEntity
 */
@Schema({ timestamps: true })
class RoleEntity extends BaseEntity {
  /**
   * Unique name of the role.
   */
  @Prop({ unique: true, required: true })
  name: string;

  /**
   * Optional description of the role.
   */
  @Prop()
  description?: string;

  /**
   * Indicates if the role is a system role.
   * Defaults to false.
   */
  @Prop({ default: false })
  isSystemRole: boolean;
}

/**
 * Mongoose schema for the Role entity class.
 */
const RoleEntitySchema = SchemaFactory.createForClass(RoleEntity);

/**
 * Pre-find hook to ensure roles are sorted by name unless another sort is specified.
 */
RoleEntitySchema.pre('find', function (this: Query<any, any>): void {
  const sort = this.getOptions().sort as
    | Record<string, 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending'>
    | undefined;

  if (sort && Object.keys(sort).length > 0) {
    if (!sort._id) {
      this.sort({ ...sort, name: 1 });
    }
  } else {
    this.sort({ name: 1 });
  }
});

/**
 * Virtual field to populate users associated with this role.
 *
 * This sets up a virtual relationship for Mongoose population, allowing you to retrieve all users
 * that reference this role via the 'role' field in the User model.
 *
 * @see https://mongoosejs.com/docs/populate.html#populate-virtuals
 * @property {Object} users - The users that have this role assigned.
 * @virtual
 */
RoleEntitySchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'role',
});

RoleEntitySchema.set('toJSON', { virtuals: true });
RoleEntitySchema.set('toObject', { virtuals: true });

/**
 * Mongoose model definition for the Role entity.
 */
const RoleEntityModel: ModelDefinition = {
  name: 'Role',
  schema: RoleEntitySchema,
};

export { RoleEntity, RoleEntityModel, RoleEntitySchema };

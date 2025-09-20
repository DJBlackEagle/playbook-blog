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
 * Mongoose model definition for the Role entity.
 */
const RoleEntityModel: ModelDefinition = {
  name: 'Role',
  schema: RoleEntitySchema,
};

export { RoleEntity, RoleEntityModel, RoleEntitySchema };

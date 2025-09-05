import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query } from 'mongoose';
import { BaseEntity } from '../../../base';

@Schema({ timestamps: true })
class RoleEntity extends BaseEntity {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isSystemRole: boolean;
}

const RoleEntitySchema = SchemaFactory.createForClass(RoleEntity);

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

RoleEntitySchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'role',
});

RoleEntitySchema.set('toJSON', { virtuals: true });
RoleEntitySchema.set('toObject', { virtuals: true });

const RoleEntityModel: ModelDefinition = {
  name: 'Role',
  schema: RoleEntitySchema,
};

export { RoleEntity, RoleEntityModel, RoleEntitySchema };

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../../base';

@Schema({ timestamps: true })
class PostEntity extends BaseEntity {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

const PostEntitySchema = SchemaFactory.createForClass(PostEntity);
PostEntitySchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

PostEntitySchema.set('toJSON', { virtuals: true });
PostEntitySchema.set('toObject', { virtuals: true });

const PostEntityModel: ModelDefinition = {
  name: 'Post',
  schema: PostEntitySchema,
};

export { PostEntity, PostEntityModel, PostEntitySchema };

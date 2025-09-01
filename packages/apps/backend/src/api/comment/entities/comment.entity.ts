import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { BaseEntity } from '../../../base';
import { PostEntityModel } from '../../post/entities/post.entity';

@Schema({ timestamps: true })
class CommentEntity extends BaseEntity {
  @Prop({ required: true })
  content: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: PostEntityModel.name,
    required: true,
  })
  post: Types.ObjectId;
}

const CommentEntitySchema = SchemaFactory.createForClass(CommentEntity);

const CommentEntityModel: ModelDefinition = {
  name: 'Comment',
  schema: CommentEntitySchema,
};

export { CommentEntity, CommentEntityModel, CommentEntitySchema };

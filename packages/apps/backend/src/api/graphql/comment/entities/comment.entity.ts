/* istanbul ignore file */
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query, SchemaTypes, Types } from 'mongoose';
import { BaseEntity } from '../../../../shared';
import { PostEntityModel } from '../../post/entities/post.entity';

/**
 * Mongoose entity representing a comment document.
 *
 * Contains the comment content and a reference to the associated post.
 */
@Schema({ timestamps: true })
class CommentEntity extends BaseEntity {
  /**
   * Content of the comment.
   */
  @Prop({ required: true })
  content: string;

  /**
   * Reference to the associated post (ObjectId).
   */
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: PostEntityModel.name,
    required: true,
  })
  post: Types.ObjectId;
}

const CommentEntitySchema = SchemaFactory.createForClass(CommentEntity);

CommentEntitySchema.pre('find', function (this: Query<any, any>): void {
  const sort = this.getOptions().sort as
    | Record<string, 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending'>
    | undefined;

  if (sort && Object.keys(sort).length > 0) {
    if (!sort._id) {
      this.sort({ ...sort, _id: 1 });
    }
  } else {
    this.sort({ createdAt: -1, _id: 1 });
  }
});

/**
 * Mongoose model definition for the Comment entity.
 */
const CommentEntityModel: ModelDefinition = {
  name: 'Comment',
  schema: CommentEntitySchema,
};

export { CommentEntity, CommentEntityModel, CommentEntitySchema };

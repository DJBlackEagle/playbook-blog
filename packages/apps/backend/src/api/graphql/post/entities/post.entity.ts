/* istanbul ignore file */
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query } from 'mongoose';
import { BaseEntity } from '../../../../shared';

/**
 * Mongoose entity representing a blog post document.
 *
 * Contains title, teaser, content, and sources for a post.
 */
@Schema({ timestamps: true })
class PostEntity extends BaseEntity {
  /**
   * Unique title of the post.
   */
  @Prop({ unique: true, required: true })
  title: string;

  /**
   * Short teaser or summary of the post.
   */
  @Prop({ required: true })
  teaser: string;

  /**
   * Main content of the post.
   */
  @Prop({ required: true })
  content: string;

  /**
   * List of source URLs or references for the post.
   */
  @Prop({ type: [String], default: [] })
  sources: string[];
}

const PostEntitySchema = SchemaFactory.createForClass(PostEntity);

PostEntitySchema.pre('find', function (this: Query<any, any>): void {
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

PostEntitySchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

PostEntitySchema.set('toJSON', { virtuals: true });
PostEntitySchema.set('toObject', { virtuals: true });

/**
 * Mongoose model definition for the Post entity.
 */
const PostEntityModel: ModelDefinition = {
  name: 'Post',
  schema: PostEntitySchema,
};

export { PostEntity, PostEntityModel, PostEntitySchema };

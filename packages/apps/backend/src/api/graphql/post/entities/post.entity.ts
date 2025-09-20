/* istanbul ignore file */
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Query } from 'mongoose';
import { BaseEntity } from '../../../../shared';

@Schema({ timestamps: true })
class PostEntity extends BaseEntity {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  teaser: string;

  @Prop({ required: true })
  content: string;

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

const PostEntityModel: ModelDefinition = {
  name: 'Post',
  schema: PostEntitySchema,
};

export { PostEntity, PostEntityModel, PostEntitySchema };

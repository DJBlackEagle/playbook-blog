import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
class BaseEntity extends Document {
  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  deletedAt!: Date;
}

export { BaseEntity };
